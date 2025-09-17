export const getStatus = (status) => {
    switch (status) {
        case 15:
            return {
                variant: 'success',
                text: "Подтверждено",
                percent: 10
            };
            break;
        case 2:
            return {
                variant: '',
                text: "Ждет подтверждения",
                percent: 5
            };
            break;
        case 3:
        case 16:
            return {
                variant: 'info',
                text: "В пути",
                percent: 40
            };;
            break;
        case 18:
            return {
                variant: 'success',
                text: "Прибыл на склад (приходные)",
                percent: 80
            };;
            break;
        case 4:
            return {
                variant: 'success',
                text: "Прибыл на склад"
            };

        case 22:
            return {
                variant: 'success',
                text: "На выдаче",
                percent: 90
            };
        case 23:
            return {
                variant: 'success',
                text: "Передан на доставку",
                percent: 90
            };
        default:
            return {
                variant: 'warning',
                text: "В ожидании",
                percent: 5
            };
    }
};

export const getNomexStatus = (status) => {
    switch (status) {
        case 1:
            return { variant: 'info', text: 'Создан (Прибыл в аэропорт)' };
        case 2:
            return { variant: '', text: 'Выполняется (В процессе таможенной обработки)' };
        case 3:
            return { variant: 'info', text: 'На начальной точке' };
        case 4:
            return { variant: 'info', text: 'Перевозится' };
        case 5:
            return { variant: 'info', text: 'На конечной точке' };
        case 6:
            return { variant: 'info', text: 'Доставляется' };
        case 7:
            return { variant: 'success', text: 'Завершен' };
        case 8:
            return { variant: 'success', text: 'Товар растаможен' };
        case 11:
            return { variant: 'warning', text: 'Ожидает прилета в Россию' };
        case 12:
            return { variant: 'warning', text: 'Задержка на таможне' };
        case 13:
            return { variant: 'warning', text: 'Требуется дополнительная/корректная информация' };
        case 14:
            return { variant: 'info', text: 'Прибыл в процессинговый центр' };
        case 15:
            return { variant: 'success', text: 'Выезд из процессингового центра' };
        case 16:
            return { variant: 'warning', text: 'Неисправность системы на таможне' };
        case 17:
            return { variant: 'success', text: 'Таможня завершена' };
        case 18:
            return { variant: 'danger', text: 'Неисправность системы' };
        case 19:
            return { variant: 'danger', text: 'Утилизация' };
        case 20:
            return { variant: 'danger', text: 'Приостановлен' };
        case 21:
            return { variant: 'info', text: 'Передано на индивидуальное оформление клиенту' };
        case 22:
            return { variant: 'success', text: 'На выдаче' };

        case -2:
            return { variant: 'danger', text: 'Не доставлен: Неточный адрес' };
        case -3:
            return { variant: 'danger', text: 'Не доставлен: Получателя не было по адресу' };
        case -4:
            return { variant: 'danger', text: 'Не доставлен: Отказано принять получателем' };
        case -5:
            return { variant: 'danger', text: 'Не прибыл' };

        default:
            return { variant: 'warning', text: 'Неизвестный статус' };
    }
};
