  export const WeatherDay = ({ min, max, weatherType, weatherIcon }) => {
    return
    (

    <>
            <img alt={weatherType} 
            src={`https://developer.accuweather.com/sites/default/files/${weatherIcon}-s.png`}
            />
         <div>
            Temp: Low{min} High{max}
        </div>
    </>
        
    );  
  };  