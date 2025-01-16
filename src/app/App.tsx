import styles from './app.module.scss';
import logo from 'src/assets/logo.svg';

import Charger from './components/Charger/Charger';

import 'src/configs/axios.config';

export type CreatedVehicleProps = { plate: string; charger: string; registerTime: string; id: number };
export type VehicleListProps = CreatedVehicleProps[];
export type ChargerProps = { name: string };

const chargers: ChargerProps[] = [
  { name: 'Tesla' },
  { name: 'Charger 1' },
  { name: 'Charger 2' },
  { name: 'Charger 3' },
];

const App = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img src={logo} width={40} />
      </header>

      <main className={styles.main}>
        <div className={styles.chargers}>
          {chargers.map((charger) => {
            return <Charger key={charger.name} charger={charger} />;
          })}
        </div>
      </main>
    </div>
  );
};

export default App;
