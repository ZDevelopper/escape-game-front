import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';


const axios = require('axios');

const Home = ({ scenarios, error }) => {
  if (error) {
    return <div>An error occured: {error.message}</div>;
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Escape game</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>

        <h1 className={styles.title}>
          Escape game le moins vendeur du monde
        </h1>
        <h2>Informations</h2>
        <ul>
          <li>Prix des séances : 30e par personne</li>
          <li>Adresse : 32 Rue du CSS absent</li>
        </ul>
        <h2>Nos scénarios vedettes</h2>
        <ul>
          {scenarios
            .map((scenario) => (
              <li key={scenario.id}>
                {scenario.attributes.Title}
                <Link href="/scenarios/[id]" as={`/scenarios/${scenario.id}`}> Afficher les détails</Link>
              </li>
            ))
          }
        </ul>
        <Link href="/scenarios">Tous nos scenarios</Link>
      </main>
    </div>
  )
}

Home.getInitialProps = async ctx => {

  const config = {
    headers: {
      'Authorization': 'Bearer 2c4d2c807f2088b111af4ab717c75176dfa6bca5da28af7c14335c7ac5a362ce948c7bdc9460c660c0c7b7ec160f7b6d645fa4b93fd606bf616601dbe67092e147b513668d892ab3e2a2de0acd7d8b97d8c0267219086fa51aae74f1828c6a424222b27926130e6ff15e4e28928325a253dae9147779674235431229c9e75469'
    }
  };
  try {
    const res = await axios.get('http://localhost:1337/api/scenarios?filters[id][$lte]=3', config);
    const scenarios = res.data.data;
    return { scenarios };
  } catch (error) {
    return { error };
  }
};

export default Home;