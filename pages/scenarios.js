import Link from 'next/link';
import styles from '../styles/Scenarios.module.css';

const axios = require('axios');

const Scenarios = ({ scenarios, error }) => {
    if (error) {
        return <div>An error occured: {error.message}</div>;
    }
    return (
        <><ul>
            {scenarios.map((scenario) => (
                <li key={scenario.id}>
                    {scenario.attributes.Title}
                    <Link href="/scenarios/[id]" as={`/scenarios/${scenario.id}`}> Afficher les détails</Link>
                </li>
            ))}
        </ul><Link href="/">Back to home</Link></>
    );
};

Scenarios.getInitialProps = async ctx => {

    const config = {
        headers: {
            'Authorization': 'Bearer 2c4d2c807f2088b111af4ab717c75176dfa6bca5da28af7c14335c7ac5a362ce948c7bdc9460c660c0c7b7ec160f7b6d645fa4b93fd606bf616601dbe67092e147b513668d892ab3e2a2de0acd7d8b97d8c0267219086fa51aae74f1828c6a424222b27926130e6ff15e4e28928325a253dae9147779674235431229c9e75469'
        }
    };
    try {
        const res = await axios.get('http://localhost:1337/api/scenarios', config);
        const scenarios = res.data.data;
        return { scenarios };
    } catch (error) {
        return { error };
    }
};


export default Scenarios;


