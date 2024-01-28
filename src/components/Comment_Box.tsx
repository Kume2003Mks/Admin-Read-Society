import { useNavigate } from 'react-router-dom';
import Styles from '../styles/Comment.module.css'
import { Timestamp } from 'firebase/firestore';
import { Icon } from '@iconify/react/dist/iconify.js';

interface Comment_Prop {
    text?: string;
    image?: string;
    user_name?: string;
    uid?: string;
    timestamp?: Timestamp;
    onDelete?: () => void;
}

const Comment_Box: React.FC<Comment_Prop> = ({ text, image, user_name, uid, timestamp, onDelete }) => {

    const navigate = useNavigate();

    const formattedDate = timestamp
        ? new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000)
        : null;

    const formatDate = (date: Date | null) => {
        if (!date) return 'No date';

        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hour = date.getHours().toString().padStart(2, '0');
        const minute = date.getMinutes().toString().padStart(2, '0');

        return `${day}/${month}/${year} ${hour}:${minute}`;
    };

    const formattedDateString = formatDate(formattedDate);

    return (
        <div className={Styles.comment_container}>
            {/* profile img */}
            <div className={Styles.profile} onClick={() => navigate(`/community/profile/${uid}`)}>
                <img src={image} alt={user_name} />
            </div>
            {/* text box */}
            <div className={Styles.comment_content}>
                <div className={Styles.user_name}>
                    <h4 onClick={() => navigate(`/community/profile/${uid}`)}>@{user_name}</h4>
                    <p>{formattedDateString}</p>
                </div>
                <div >
                    <p>{text}</p>
                </div>
                <div className={Styles.interact_bar} onClick={onDelete}>
                    <div className={Styles.line} />
                    <div>
                        <Icon icon="solar:trash-bin-trash-bold" className={Styles.icon_btn} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comment_Box