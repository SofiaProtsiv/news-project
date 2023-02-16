import { useEffect, useState } from 'react';
import { Icon } from '../../images/icons';
import CalendarDates from 'calendar-dates';

import './calendar.scss';

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

export default function Calendar() {
    const [calendarDates, setCalendarDates] = useState([]);

    const [month, setMonth] = useState(0);
    const [day, setDay] = useState(0);
    const [year, setYear] = useState(0);

    const [isCalendarOpen, setIsCalendarOpen] = useState(false)

    const calendar = new CalendarDates();

    useEffect(() => {
        setDay(new Date().getDate());
        setMonth(new Date().getMonth());
        setYear(new Date().getFullYear());

        getCalendarDates(new Date(year, month, day));
    }, []);

    useEffect(() => {
        getCalendarDates(new Date(year, month, day));
    }, [year, month, day]);

    async function getCalendarDates(date) {
        const dates = await calendar.getDates(date);
        setCalendarDates(dates);
    }

    function handleDateClick(e) {
        const selectedDay = new Date(e.target.dataset.date)

        document.querySelectorAll('.calendar__days li').forEach(li => {
            if (li.classList.contains('active')) {
                li.classList.remove('active');
            }
        });

        e.target.classList.add('active');

        setDay(selectedDay.getDate());
        setMonth(selectedDay.getMonth());

        setIsCalendarOpen(false)
    }

    function handleNextMonth() {
        month < 11 ? setMonth(month + 1) : setMonth(0);
    }

    function handlePreviousMonth() {
        month >= 2 ? setMonth(month - 1) : setMonth(11);
    }

    const dateView = day.toString().padStart(2, 0) + "/" + (month + 1).toString().padStart(2, 0) + "/" + year;

    return (
        <div className="calendar">
            <div className={isCalendarOpen ? 'calendar__button active' : 'calendar__button'} onClick={() => setIsCalendarOpen(!isCalendarOpen)} >
                <Icon id="calendar" className="calendar__button-icon" />
                <p className='calendar__button-text'>{dateView}</p>
                <Icon id="arrowUp" className="calendar__button-icon--arrow-down" />
            </div>

            {isCalendarOpen &&
                <div className='calendar__content-wrapper' >
                    <div className="calendar__header">
                        <div className="calendar__current-date-container">
                            <p className="calendar__current-date">{months[month]}</p>
                            <p className="calendar__current-date">{year}</p>
                        </div>
                        <div className="calendar__icons-container">
                            <span onClick={handlePreviousMonth}>
                                <Icon id="arrowUp" className="calendar__month-arrow-right" />
                            </span>
                            <span onClick={handleNextMonth}>
                                <Icon id="arrowUp" className="calendar__month-arrow-left" />
                            </span>
                        </div>
                    </div>
                    <div className="calendar__container">
                        <ul className="calendar__weeks">
                            <li>Su</li>
                            <li>Mo</li>
                            <li>Tu</li>
                            <li>We</li>
                            <li>Th</li>
                            <li>Fr</li>
                            <li>Sa</li>
                        </ul>
                        <ul className="calendar__days">
                            {calendarDates.map(({ date, iso, type }) => {
                                return (
                                    <li
                                        key={iso}
                                        data-date={iso}
                                        className={`${type === 'previous' || type === 'next' ? 'inactive' : ''} ${date === day ? 'active' : ''
                                            }`}
                                        onClick={handleDateClick}
                                    >
                                        {date}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>

            }
        </div>
    )
}
