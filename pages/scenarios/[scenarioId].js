import Link from 'next/link';

const axios = require('axios');

const ScenarioDetails = ({ scenario, error }) => {

    if (error) {
        return <div>An error occured: {error.message}</div>;
    }

    return (
        <><h1>Détail du scénario : {scenario.attributes.Title}</h1>
            <h2>
                Description
            </h2>
            <p>{scenario.attributes.Description}</p>
            <h2>
                Durée
            </h2>
            <p>{scenario.attributes.Duration} minutes</p>
            <h2>
                Nombre de joueurs
            </h2>
            <p>{scenario.attributes.minPlayers} joueurs minimum et {scenario.attributes.maxPlayers} joueurs maximum</p>
            <h2>
                Difficulté
            </h2>
            <p>{scenario.attributes.difficulty}</p>
            <Link href="/scenarios">Retour à la liste des scénarios</Link>
        </>
    )
}

ScenarioDetails.getInitialProps = async ({ query }) => {
    const scenarioId = query.scenarioId;
    const config = {
        headers: {
            'Authorization': 'Bearer 2c4d2c807f2088b111af4ab717c75176dfa6bca5da28af7c14335c7ac5a362ce948c7bdc9460c660c0c7b7ec160f7b6d645fa4b93fd606bf616601dbe67092e147b513668d892ab3e2a2de0acd7d8b97d8c0267219086fa51aae74f1828c6a424222b27926130e6ff15e4e28928325a253dae9147779674235431229c9e75469'
        }
    };

    try {
        const res = await axios.get(`http://localhost:1337/api/scenarios/${scenarioId}`, config);
        const scenario = res.data.data;
        return { scenario };
    } catch (error) {
        return { error };
    }
}

export default ScenarioDetails;