import style from '../styles/404.module.scss';
const NotFound = () => {
    return ( 
        <div className={style.NotFound}>
            <h1>404 </h1>
            <p>متاسفانه صفحه مورد نظر شما پیدا نشد :(</p>
        </div>
     );
}
 
export default NotFound;