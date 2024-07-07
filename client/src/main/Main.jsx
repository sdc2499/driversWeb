import React from 'react';
import './main.css'; // קובץ ה-CSS

const Main = () => {



    return (
        <div className="main-container">
            <div className="background-image" />
            <div className="content">
                <h1>ברוכים הבאים ל-זמינלי</h1>
                <p>
                    להיות חלק משירותנו זה להיות חלק ממסע מגוון של חוויות וקשרים. כאן,
                    אנחנו מחברים בין אנשים למטרה משותפת של בטיחות, נוחות ואמינות.
                    בצד הנוסעים, או הנהגים, או שניהם, תמצאו אצלנו את המענה המושלם
                    לצרכיכם, וזהו מה שהופך את שירותנו לשווה ביותר.
                </p>
                <div className="right-side-box">
                    <img src="../../button.png" alt="Additional Image" className="additional-image" />
                </div>
                <img src="../../imgg.png" alt="Additional Image" className="image" />
            </div>
        </div>
    );
};

export default Main;
