import React, { useEffect, useState } from 'react';
import './PerformanceData.css';

const PerformanceData = () => {
    const [navigationTiming, setNavigationTiming] = useState(null);
    const [resourceTiming, setResourceTiming] = useState(null);

    useEffect(() => {
        const fetchNavigationTiming = () => {// получает записи о времени навигации
            if (window.performance && window.performance.getEntriesByType) {
                const navigationEntries = window.performance.getEntriesByType('navigation');
                setNavigationTiming(navigationEntries[0]);
            }
        };

        const fetchResourceTiming = () => {//получает записи о времени загрузки ресурсов.
            if (window.performance && window.performance.getEntriesByType) {
                const resourceEntries = window.performance.getEntriesByType('resource');
                setResourceTiming(resourceEntries);
            }
        };

        fetchNavigationTiming();
        fetchResourceTiming();
    }, []);


    const pageLoadTime = navigationTiming ? navigationTiming.duration : null;

    const imageLoadTimes = resourceTiming
        ? resourceTiming.filter(entry => entry.initiatorType === 'img')
        : [];

    // Обновите компонент PerformanceData, чтобы он отображал изображения

    return (
        <div className="performance-data">
            <h2>время загружение страницы: {pageLoadTime} ms</h2>
            <h2>время загружение фотки :</h2>
            <a href="https://www.canva.com/design/DAF2sMTWc84/2KbxiPj5eWWsj8QOIk2fvQ/edit" className="button">Документация отчетность</a>


            <ul className="image-list">
                {imageLoadTimes.map((entry, index) => (
                    <li key={index}>
                        <img src={entry.name} alt={`Images ${index + 1}`}/>
                        <div>{entry.duration} ms</div>
                    </li>
                ))}
            </ul>
        </div>
    );

};

export default PerformanceData;
