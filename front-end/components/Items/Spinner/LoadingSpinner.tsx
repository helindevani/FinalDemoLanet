import classes from './LoadingSpinner.module.css';

export default function LoadingSpinner() {
  return (
    <div className='h-screen w-screen'>
          <div className={classes.frame}>
      <div className={classes.center}>
        <div className={classes.dot1}></div>
        <div className={classes.dot2}></div>
        <div className={classes.dot3}></div>
      </div>
    </div>
    </div>
  
  );
}
