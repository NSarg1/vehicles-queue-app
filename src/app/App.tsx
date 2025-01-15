import styles from './app.module.scss';

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
      <h1>Charger Waiting List</h1>
      <div className={styles.chargers}>
        {chargers.map((charger) => {
          return <Charger key={charger.name} charger={charger} />;
        })}
      </div>
    </div>
  );
};

export default App;
