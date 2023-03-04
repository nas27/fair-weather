export const WeatherDay = ({min, max, weatherType, weatherIcon, dateDay}) => {

  return (
      <>
      {dateDay}
        <div>
          <img alt='weather info'
          src={`https://developer.accuweather.com/sites/default/files/${weatherIcon}-s.png`} 
          />
          <div>Low: {min} ~
          High: {max}</div>
        </div>
      </>
    );
  };