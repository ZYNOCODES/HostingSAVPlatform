const Agent = require('../models/AgentModel');

const GetAgents = async (req, res) => {
  try {
    const Agents = await Agent.findAll();
      if (Agents.length > 0) {
        res.status(200).json(Agents);
      }else{
        res.status(400).json({message: 'No Agents found'});
      }
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting panne');
  }
}

module.exports = {
    GetAgents,
}