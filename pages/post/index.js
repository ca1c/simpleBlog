import axios from 'axios';
import Navigation from '../../components/navigation.component';

function Post({ data }) {
    const props = data;

    return (
        <>
            <Navigation />
            <div>
                <h1>Post Not Found</h1>
            </div>
        </>
    )
}

export default Post