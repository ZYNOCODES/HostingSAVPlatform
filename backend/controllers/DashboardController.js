const Dashboard = require('../models/DashboardModel');
const StatisticsCentre = require('../models/StatisticsCentreModel');
const { Op } = require('sequelize');
const validator = require('validator');
const moment = require('moment');

// get all data from dashboard
const GetAll = async (req, res) => {
    const todayDate = new Date().toISOString().slice(0, 10);
    try {
        const dashboard = await Dashboard.findOne({
            where: {
                createdAt: todayDate
            }
        });
        if (dashboard) {
          res.status(200).json({Dashboard : dashboard});
        }else{
          res.json({message: 'No dashboard found'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error getting dashboard');
    }
}   
const GetAllSuspended = async (req, res) => {
    try {
        const dashboards = await Dashboard.findAll({
            where: {
                ProduitSuspendu: {
                    [Op.gt]: 0 
                }
            }
        });

        if (dashboards.length > 0) {
            const suspendedSum = dashboards.reduce((sum, dashboard) => sum + dashboard.ProduitSuspendu, 0);
            res.status(200).json({ SuspendedSum: suspendedSum });
        } else {
            res.json({ message: 'No dashboards found with ProduitSuspendu > 0' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error getting dashboard');
    }
}
//get a specific user
const GetAllByCentre = async (req, res) => {
    const { centre } = req.params;
    const todayDate = new Date().toISOString().slice(0, 10);
    try {
        const dashboard = await StatisticsCentre.findAll({
            where: {
                createdAt: todayDate,
                Centre : centre
            }
        });
        if (dashboard) {
          res.status(200).json({Dashboard : dashboard});
        }else{
          res.status(500).json({message: 'No dashboard found'});
        }
    }catch(e) {
        console.error(error);
        res.status(500).send('Error getting dashboard by centre');
    }
}

//get dashboard by week
const GetByWeek = async (req, res) => {
    try {
        // Check if today is Saturday
        if (moment().day() === 6) {
            // If today is Saturday, set the start date to today and end date to next Friday
            const startDate = moment().format('YYYY-MM-DD');
            const endDate = moment().clone().day(12).format('YYYY-MM-DD'); // 12 is next Friday (6 days from Saturday)
            
            const dashboardData = await Dashboard.findAll({
                where: {
                    createdAt: {
                        [Op.between]: [startDate, endDate]
                    }
                }
            });
        
            if (dashboardData && dashboardData.length > 0) {
                res.status(200).json({ Dashboard: dashboardData,
                    week: [moment().format('YYYY-MM-DD'), moment().clone().day(12).format('YYYY-MM-DD')]});
            } else {
                res.status(404).json({ message: 'No dashboard data found for this week' });
            }
        } else {
            // If today is not Saturday, find data from last Saturday to Friday
            const startDate = moment().clone().day(-1).format('YYYY-MM-DD'); // Last Saturday
            const endDate = moment().clone().day(5).format('YYYY-MM-DD'); // This Friday
            
            const dashboardData = await Dashboard.findAll({
                where: {
                    createdAt: {
                        [Op.between]: [startDate, endDate]
                    }
                }
            });
            if (dashboardData && dashboardData.length > 0) {
                res.status(200).json({ Dashboard: dashboardData,
                    week: [moment().day(-1).format('YYYY-MM-DD'), moment().day(5).format('YYYY-MM-DD')]});
            } else {
                res.status(404).json({ message: 'No dashboard data found for this week' });
            }
        }      
    } catch (error) {
        console.error(error);
        res.status(500).send('Error getting dashboard by week');
    }
}

//get dashboard by month
const GetByMonth = async (req, res) => {
    try{
        // find data from January of the current year to December of the current year
        const startDate = moment().clone().startOf('year').format('YYYY-MM-DD');
        const endDate = moment().clone().endOf('year').format('YYYY-MM-DD');
        
        const dashboardData = await Dashboard.findAll({
            where: {
                createdAt: {
                    [Op.between]: [startDate, endDate]
                }
            }
        });
        if (dashboardData && dashboardData.length > 0) {
            const data = calculateMonthlyDashboardData(dashboardData);
            res.status(200).json({ Dashboard: data,
                week: [moment().clone().startOf('year').format('YYYY-MM-DD'), moment().clone().endOf('year').format('YYYY-MM-DD')]});
        } else {
            res.status(404).json({ message: 'No dashboard data found for this year' });
        }
    }catch (error) {
        console.error(error);
        res.status(500).send('Error getting dashboard by month');
    }
}

//get dashboard by year
const GetByYear = async (req, res) => {
    try{
        // Get the current year
        const currentYear = moment().year();

        // Calculate the year 5 years ago from the current year
        const fiveYearsAgoYear = currentYear - 5;

        // Create the start date as January 1st of the five years ago year
        const startDate = moment(`${fiveYearsAgoYear}-01-01`);

        // Create the end date as December 31st of the current year
        const endDate = moment(`${currentYear}-12-31`);

        const dashboardData = await Dashboard.findAll({
            where: {
                createdAt: {
                    [Op.between]: [startDate.toDate(), endDate.toDate()] // Convert to JavaScript Date objects
                }
            }
        });
        if (dashboardData && dashboardData.length > 0) {
            const data = calculateYearlyDashboardData(dashboardData);
            res.status(200).json({ Dashboard: data,
                week: [startDate.toDate(), endDate.toDate()]});
        } else {
            res.status(404).json({ message: 'No dashboard data found for this year' });
        }
    }catch (error) {
        console.error(error);
        res.status(500).send('Error getting dashboard by year');
    }
}

// Construct the monthly dashboard data
function calculateMonthlyDashboardData(dashboardData) {
    const monthlyData = {};
    // Loop through the dashboardData array
    for (const entry of dashboardData) {
        // Extract the month and year from the 'createdAt' field
        const createdAt = moment(entry.createdAt);
        const monthYear = createdAt.format('YYYY-MM');

        // If the monthYear doesn't exist in monthlyData, initialize it
        if (!monthlyData[monthYear]) {
            monthlyData[monthYear] = {
                id: Object.keys(monthlyData).length + 1,
                NbTicketsOuverts: 0,
                ProduitEnAttente: 0,
                ProduitDeposes: 0,
                ProduitRepares: 0,
                ProduitEnReparation: 0,
                EnAttenteDePickup: 0,
                Produitlivre: 0,
                DelaiMoyenReparation: '00:00:00',
                month: createdAt.format('M'),
            };
        }

        monthlyData[monthYear].NbTicketsOuverts += entry.NbTicketsOuverts;
        monthlyData[monthYear].ProduitEnAttente += entry.ProduitEnAttente;
        monthlyData[monthYear].ProduitDeposes += entry.ProduitDeposes;
        monthlyData[monthYear].ProduitRepares += entry.ProduitRepares;
        monthlyData[monthYear].ProduitEnReparation += entry.ProduitEnReparation;
        monthlyData[monthYear].EnAttenteDePickup += entry.EnAttenteDePickup;
        monthlyData[monthYear].Produitlivre += entry.Produitlivre;

    }

    // Convert the monthlyData object to an array
    const DashboardMonthly = Object.values(monthlyData);

    return DashboardMonthly;
}

// Construct the yearly dashboard data
function calculateYearlyDashboardData(dashboardData) {
    const yearlyData = {};
    // Loop through the dashboardData array
    for (const entry of dashboardData) {
        // Extract the year from the 'createdAt' field
        const createdAt = moment(entry.createdAt);
        const year = createdAt.year();

        // If the year doesn't exist in yearlyData, initialize it
        if (!yearlyData[year]) {
            yearlyData[year] = {
                NbTicketsOuverts: 0,
                ProduitEnAttente: 0,
                ProduitDeposes: 0,
                ProduitRepares: 0,
                ProduitEnReparation: 0,
                EnAttenteDePickup: 0,
                Produitlivre: 0,
                DelaiMoyenReparation: '00:00:00',
                year: year,
            };
        }

        yearlyData[year].NbTicketsOuverts += entry.NbTicketsOuverts;
        yearlyData[year].ProduitEnAttente += entry.ProduitEnAttente;
        yearlyData[year].ProduitDeposes += entry.ProduitDeposes;
        yearlyData[year].ProduitRepares += entry.ProduitRepares;
        yearlyData[year].ProduitEnReparation += entry.ProduitEnReparation;
        yearlyData[year].EnAttenteDePickup += entry.EnAttenteDePickup;
        yearlyData[year].Produitlivre += entry.Produitlivre;
        
    }

    // Convert the yearlyData object to an array
    const DashboardYearly = Object.values(yearlyData);

    return DashboardYearly;
}

module.exports = {
    GetAll,
    GetAllByCentre,
    GetByWeek,
    GetByMonth,
    GetByYear,
    GetAllSuspended
}