import axios from 'axios';
import Navigation from '../../components/navigation.component';

function SinglePost({ data }) {
    const props = data;
    console.log(props);

    return (
        <>
            <Navigation />
            <div>
                <div className="container">
                    <h1>{props.title}</h1>
                    <h4>{props.subheading}</h4>
                    <p>{props.bodyText}</p>
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps(context) {
    const res = await axios.get(`http://localhost:8080/api/getPost?post=${context.params.postId}`);
    const data = await res.data;

    return { props: { data } };
}

export default SinglePost