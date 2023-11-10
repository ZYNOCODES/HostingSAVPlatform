import { HiCheckCircle, HiEllipsisVertical } from "react-icons/hi2";
import { MdAccessTimeFilled } from "react-icons/md";

export default function TableTraitement() {
  return (
    <div className="dashboard-table-traitement">
      <div className="dashboard-table-header">
        <h2>En cours de traitement</h2>
        <div className="dashboard-table-header-right">
          <div className="table-right-item">
            <h3>90</h3>
            <span>en cours</span>
          </div>
          <div className="table-right-lv"></div>
          <div className="table-right-item">
            <h3>120</h3>
            <span>terminés</span>
          </div>
          <div className="select-table-traitement">
            <select name="select-table-traitement" id="select-table-traitement">
              <option value="all-traitement">All</option>
              <option value="encours-traitement">En cours</option>
              <option value="termine-traitement">Termines</option>
            </select>
          </div>
        </div>
      </div>
      <div className="dashboard-table-container">
        <div className="dashboard-table-lh"></div>
        <table>
          <tr>
            <td className="title-table-traitement-nom">Nom complet</td>
            <td className="title-table-traitement-date">Date et heure</td>
            <td className="title-table-traitement-status">Status</td>
            <td className="title-table-traitement-progres">Progrès</td>
            <td className="title-table-traitement-cas">Cas</td>
          </tr>
          <tr>
            <td className="table-traitement-nom">
              <input type="checkbox" name="" id="" />
              Nom complet
            </td>
            <td className="table-traitement-date">
              6 Apr 2023 <br />
              <span>14:00</span>
            </td>
            <td className="table-traitement-status">
              <div className="table-status-item encours">
                <span className="flex gap-2 items-center">
                  <MdAccessTimeFilled fill="#4F81FF" /> en cours
                </span>
              </div>
            </td>
            <td className="table-traitement-progres">
              <div className="table-progres-item yellow">
                <span>D.Obstetrique</span>
              </div>
              <div className="table-progres-item bleu">
                <span>Carnet</span>
              </div>
              <div className="table-progres-item green">
                <span>Vaccin</span>
              </div>
              <div className="table-progres-item gray">
                <span>Pediatre</span>
              </div>
            </td>
            <td className="table-traitement-cas">Normal</td>
          </tr>
          <tr>
            <td className="table-traitement-nom">
              <input type="checkbox" name="" id="" />
              Nom complet
            </td>
            <td className="table-traitement-date">
              6 Apr 2023 <br />
              <span>14:00</span>
            </td>
            <td className="table-traitement-status">
              <div className="table-status-item termine">
                <span className="flex gap-2 items-center">
                  <HiCheckCircle fill="#6CAB76" /> terminés
                </span>
              </div>
            </td>
            <td className="table-traitement-progres">
              <div className="table-progres-item obstetrique">
                <span>D.Obstetrique</span>
              </div>
              <div className="table-progres-item carnet">
                <span>Carnet</span>
              </div>
              <div className="table-progres-item vaccin">
                <span>Vaccin</span>
              </div>
              <div className="table-progres-item pediatre">
                <span>Pediatre</span>
              </div>
            </td>
            <td className="table-traitement-cas">Normal</td>
          </tr>
          <tr>
            <td className="table-traitement-nom">
              <input type="checkbox" name="" id="" />
              Nom complet
            </td>
            <td className="table-traitement-date">
              6 Apr 2023 <br />
              <span>14:00</span>
            </td>
            <td className="table-traitement-status">
              <div className="table-status-item encours">
                <span className="flex gap-2 items-center">
                  <MdAccessTimeFilled fill="#4F81FF" /> en cours
                </span>
              </div>
            </td>
            <td className="table-traitement-progres">
              <div className="table-progres-item obstetrique">
                <span>D.Obstetrique</span>
              </div>
              <div className="table-progres-item carnet">
                <span>Carnet</span>
              </div>
              <div className="table-progres-item vaccin">
                <span>Vaccin</span>
              </div>
              <div className="table-progres-item pediatre">
                <span>Pediatre</span>
              </div>
            </td>
            <td className="table-traitement-cas">Normal</td>
          </tr>
          <tr>
            <td className="table-traitement-nom">
              <input type="checkbox" name="" id="" />
              Nom complet
            </td>
            <td className="table-traitement-date">
              6 Apr 2023 <br />
              <span>14:00</span>
            </td>
            <td className="table-traitement-status">
              <div className="table-status-item encours">
                <span className="flex gap-2 items-center">
                  <MdAccessTimeFilled fill="#4F81FF" /> en cours
                </span>
              </div>
            </td>
            <td className="table-traitement-progres">
              <div className="table-progres-item obstetrique">
                <span>D.Obstetrique</span>
              </div>
              <div className="table-progres-item carnet">
                <span>Carnet</span>
              </div>
              <div className="table-progres-item vaccin">
                <span>Vaccin</span>
              </div>
              <div className="table-progres-item pediatre">
                <span>Pediatre</span>
              </div>
            </td>
            <td className="table-traitement-cas">Normal</td>
          </tr>
          <tr>
            <td className="table-traitement-nom">
              <input type="checkbox" name="" id="" />
              Nom complet
            </td>
            <td className="table-traitement-date">
              6 Apr 2023 <br />
              <span>14:00</span>
            </td>
            <td className="table-traitement-status">
              <div className="table-status-item encours">
                <span className="flex gap-2 items-center">
                  <MdAccessTimeFilled fill="#4F81FF" /> en cours
                </span>
              </div>
            </td>
            <td className="table-traitement-progres">
              <div className="table-progres-item obstetrique">
                <span>D.Obstetrique</span>
              </div>
              <div className="table-progres-item carnet">
                <span>Carnet</span>
              </div>
              <div className="table-progres-item vaccin">
                <span>Vaccin</span>
              </div>
              <div className="table-progres-item pediatre">
                <span>Pediatre</span>
              </div>
            </td>
            <td className="table-traitement-cas">Normal</td>
          </tr>
          <tr>
            <td className="table-traitement-nom">
              <input type="checkbox" name="" id="" />
              Nom complet
            </td>
            <td className="table-traitement-date">
              6 Apr 2023 <br />
              <span>14:00</span>
            </td>
            <td className="table-traitement-status">
              <div className="table-status-item encours">
                <span className="flex gap-2 items-center">
                  <MdAccessTimeFilled fill="#4F81FF" /> en cours
                </span>
              </div>
            </td>
            <td className="table-traitement-progres">
              <div className="table-progres-item obstetrique">
                <span>D.Obstetrique</span>
              </div>
              <div className="table-progres-item carnet">
                <span>Carnet</span>
              </div>
              <div className="table-progres-item vaccin">
                <span>Vaccin</span>
              </div>
              <div className="table-progres-item pediatre">
                <span>Pediatre</span>
              </div>
            </td>
            <td className="table-traitement-cas">Normal</td>
          </tr>
          <tr>
            <td className="table-traitement-nom">
              <input type="checkbox" name="" id="" />
              Nom complet
            </td>
            <td className="table-traitement-date">
              6 Apr 2023 <br />
              <span>14:00</span>
            </td>
            <td className="table-traitement-status">
              <div className="table-status-item encours">
                <span className="flex gap-2 items-center">
                  <MdAccessTimeFilled fill="#4F81FF" /> en cours
                </span>
              </div>
            </td>
            <td className="table-traitement-progres">
              <div className="table-progres-item obstetrique">
                <span>D.Obstetrique</span>
              </div>
              <div className="table-progres-item carnet">
                <span>Carnet</span>
              </div>
              <div className="table-progres-item vaccin">
                <span>Vaccin</span>
              </div>
              <div className="table-progres-item pediatre">
                <span>Pediatre</span>
              </div>
            </td>
            <td className="table-traitement-cas">Normal</td>
          </tr>
          <tr>
            <td className="table-traitement-nom">
              <input type="checkbox" name="" id="" />
              Nom complet
            </td>
            <td className="table-traitement-date">
              6 Apr 2023 <br />
              <span>14:00</span>
            </td>
            <td className="table-traitement-status">
              <div className="table-status-item encours">
                <span className="flex gap-2 items-center">
                  <MdAccessTimeFilled fill="#4F81FF" /> en cours
                </span>
              </div>
            </td>
            <td className="table-traitement-progres">
              <div className="table-progres-item obstetrique">
                <span>D.Obstetrique</span>
              </div>
              <div className="table-progres-item carnet">
                <span>Carnet</span>
              </div>
              <div className="table-progres-item vaccin">
                <span>Vaccin</span>
              </div>
              <div className="table-progres-item pediatre">
                <span>Pediatre</span>
              </div>
            </td>
            <td className="table-traitement-cas">Normal</td>
          </tr>
          <tr>
            <td className="table-traitement-nom">
              <input type="checkbox" name="" id="" />
              Nom complet
            </td>
            <td className="table-traitement-date">
              6 Apr 2023 <br />
              <span>14:00</span>
            </td>
            <td className="table-traitement-status">
              <div className="table-status-item encours">
                <span className="flex gap-2 items-center">
                  <MdAccessTimeFilled fill="#4F81FF" /> en cours
                </span>
              </div>
            </td>
            <td className="table-traitement-progres">
              <div className="table-progres-item obstetrique">
                <span>D.Obstetrique</span>
              </div>
              <div className="table-progres-item carnet">
                <span>Carnet</span>
              </div>
              <div className="table-progres-item vaccin">
                <span>Vaccin</span>
              </div>
              <div className="table-progres-item pediatre">
                <span>Pediatre</span>
              </div>
            </td>
            <td className="table-traitement-cas">Normal</td>
          </tr>
          <tr>
            <td className="table-traitement-nom">
              <input type="checkbox" name="" id="" />
              Nom complet
            </td>
            <td className="table-traitement-date">
              6 Apr 2023 <br />
              <span>14:00</span>
            </td>
            <td className="table-traitement-status">
              <div className="table-status-item encours">
                <span className="flex gap-2 items-center">
                  <MdAccessTimeFilled fill="#4F81FF" /> en cours
                </span>
              </div>
            </td>
            <td className="table-traitement-progres">
              <div className="table-progres-item obstetrique">
                <span>D.Obstetrique</span>
              </div>
              <div className="table-progres-item carnet">
                <span>Carnet</span>
              </div>
              <div className="table-progres-item vaccin">
                <span>Vaccin</span>
              </div>
              <div className="table-progres-item pediatre">
                <span>Pediatre</span>
              </div>
            </td>
            <td className="table-traitement-cas">Normal</td>
          </tr>
          <tr>
            <td className="table-traitement-nom">
              <input type="checkbox" name="" id="" />
              Nom complet
            </td>
            <td className="table-traitement-date">
              6 Apr 2023 <br />
              <span>14:00</span>
            </td>
            <td className="table-traitement-status">
              <div className="table-status-item encours">
                <span className="flex gap-2 items-center">
                  <MdAccessTimeFilled fill="#4F81FF" /> en cours
                </span>
              </div>
            </td>
            <td className="table-traitement-progres">
              <div className="table-progres-item obstetrique">
                <span>D.Obstetrique</span>
              </div>
              <div className="table-progres-item carnet">
                <span>Carnet</span>
              </div>
              <div className="table-progres-item vaccin">
                <span>Vaccin</span>
              </div>
              <div className="table-progres-item pediatre">
                <span>Pediatre</span>
              </div>
            </td>
            <td className="table-traitement-cas">Normal</td>
          </tr>
          <tr>
            <td className="table-traitement-nom">
              <input type="checkbox" name="" id="" />
              Nom complet
            </td>
            <td className="table-traitement-date">
              6 Apr 2023 <br />
              <span>14:00</span>
            </td>
            <td className="table-traitement-status">
              <div className="table-status-item encours">
                <span className="flex gap-2 items-center">
                  <MdAccessTimeFilled fill="#4F81FF" /> en cours
                </span>
              </div>
            </td>
            <td className="table-traitement-progres">
              <div className="table-progres-item obstetrique">
                <span>D.Obstetrique</span>
              </div>
              <div className="table-progres-item carnet">
                <span>Carnet</span>
              </div>
              <div className="table-progres-item vaccin">
                <span>Vaccin</span>
              </div>
              <div className="table-progres-item pediatre">
                <span>Pediatre</span>
              </div>
            </td>
            <td className="table-traitement-cas">Normal</td>
          </tr>
          <tr>
            <td className="table-traitement-nom">
              <input type="checkbox" name="" id="" />
              Nom complet
            </td>
            <td className="table-traitement-date">
              6 Apr 2023 <br />
              <span>14:00</span>
            </td>
            <td className="table-traitement-status">
              <div className="table-status-item encours">
                <span className="flex gap-2 items-center">
                  <MdAccessTimeFilled fill="#4F81FF" /> en cours
                </span>
              </div>
            </td>
            <td className="table-traitement-progres">
              <div className="table-progres-item obstetrique">
                <span>D.Obstetrique</span>
              </div>
              <div className="table-progres-item carnet">
                <span>Carnet</span>
              </div>
              <div className="table-progres-item vaccin">
                <span>Vaccin</span>
              </div>
              <div className="table-progres-item pediatre">
                <span>Pediatre</span>
              </div>
            </td>
            <td className="table-traitement-cas">Normal</td>
          </tr>
          <tr>
            <td className="table-traitement-nom">
              <input type="checkbox" name="" id="" />
              Nom complet
            </td>
            <td className="table-traitement-date">
              6 Apr 2023 <br />
              <span>14:00</span>
            </td>
            <td className="table-traitement-status">
              <div className="table-status-item encours">
                <span className="flex gap-2 items-center">
                  <MdAccessTimeFilled fill="#4F81FF" /> en cours
                </span>
              </div>
            </td>
            <td className="table-traitement-progres">
              <div className="table-progres-item obstetrique">
                <span>D.Obstetrique</span>
              </div>
              <div className="table-progres-item carnet">
                <span>Carnet</span>
              </div>
              <div className="table-progres-item vaccin">
                <span>Vaccin</span>
              </div>
              <div className="table-progres-item pediatre">
                <span>Pediatre</span>
              </div>
            </td>
            <td className="table-traitement-cas">Normal</td>
          </tr>
          <tr>
            <td className="table-traitement-nom">
              <input type="checkbox" name="" id="" />
              Nom complet
            </td>
            <td className="table-traitement-date">
              6 Apr 2023 <br />
              <span>14:00</span>
            </td>
            <td className="table-traitement-status">
              <div className="table-status-item encours">
                <span className="flex gap-2 items-center">
                  <MdAccessTimeFilled fill="#4F81FF" /> en cours
                </span>
              </div>
            </td>
            <td className="table-traitement-progres">
              <div className="table-progres-item obstetrique">
                <span>D.Obstetrique</span>
              </div>
              <div className="table-progres-item carnet">
                <span>Carnet</span>
              </div>
              <div className="table-progres-item vaccin">
                <span>Vaccin</span>
              </div>
              <div className="table-progres-item pediatre">
                <span>Pediatre</span>
              </div>
            </td>
            <td className="table-traitement-cas">Normal</td>
          </tr>
        </table>
      </div>
    </div>
  );
}
