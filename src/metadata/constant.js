import colors from "../styles/colors";

const hiddenRoutes = [
    'Address',
]

const languages = [
    {
        id: "1",
        name: "Кыргызча",
        flag: require("../assets/kyrgyzstan.jpg"),
    },
    {
        id: "2",
        name: "Русский",
        flag: require("../assets/russia.jpg"),
    },
    {
        id: "3",
        name: "English",
        flag: require("../assets/usa.jpg"),
    },
];
const countries = [
    {
        id: "1",
        name: "США",
        flag: require("../assets/usa.jpg"),
    },
    {
        id: "2",
        name: "Испания",
        flag: require("../assets/spain.jpg"),
    },
    {
        id: "3",
        name: "Корея",
        flag: require("../assets/korea.jpg"),
    },
    {
        id: "4",
        name: "Китай",
        flag: require("../assets/china.jpg"),
    },
];
const daysOfWeek = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
];
const workingDays = [
    { day: "Понедельник", time: "09:00-17:00" },
    { day: "Вторник", time: "09:00-17:00" },
    { day: "Среда", time: "09:00-17:00" },
    { day: "Четверг", time: "09:00-17:00" },
    { day: "Пятница", time: "09:00-17:00" },
].map((item) => ({
    ...item,
    isHighlighted: item.day === daysOfWeek[new Date().getDay()],
}));

const prohibitedProducts = [
    { name: "Аэрозоль", icon: "spray" },
    { name: "Жидкость", icon: "flask-outline" },
    { name: "Воздушная подушка", icon: "airbag" },
    { name: "Еда", icon: "food" },
];
const orderTabs = [
    { label: "Заказано", icon: "checkmark-outline", status: 0 },
    { label: "На складе", icon: "cube-outline", status: 15 },
    { label: "В пути", icon: "navigate-outline", status: 16 },
    { label: "Готово", icon: "home-outline", status: 18 },
    { label: "Полученные", icon: "checkmark-circle-outline", status: 4 },
];
const buyForMestatuses = [
    { id: "all", label: "Все", status: "all" },
    { id: "in_progress", label: "В процессе", status: 0 },
    { id: "pending", label: "Требуется подтверждение", status: 1 },
    { id: "confirmed", label: "Подтверждено", status: 2 },
    { id: "canceled", label: "Отменено", status: 3 },
    { id: "purchased", label: "Куплено", status: 4 },
    { id: "in_stock", label: "На складе", status: 5 },
    { id: "denied", label: "Отказано", status: 6 },
];
const tools = [
    // {
    //     id: "1",
    //     name: "Отследить заказ",
    //     icon: "location-outline",
    //     page: "TrackOrder",
    // },
    // {
    //     id: "2",
    //     name: "Калькулятор",
    //     icon: "calculator-outline",
    //     page: "Calculator",
    // },
    // { id: "3", name: "Магазины", icon: "basket-outline", page: "Shops" },
    { id: "3", name: "Доставка до двери", icon: "car-outline", page: "Shops" },
    {
        id: "4",
        name: "Купи вместо меня",
        icon: "bag-handle-outline",
        page: "(tabs)/navigation/BuyForMe",
    },
    // {
    //     id: "5",
    //     name: "Адреса",
    //     icon: "location-outline",
    //     page: "Address",
    // },
    // {
    //     id: "6",
    //     name: "Баланс",
    //     icon: "wallet-outline",
    //     page: "BuyForMe",
    // },
];
const mockStores = [
    { id: "1", name: "Store A", logo: "https://via.placeholder.com/80" },
    { id: "2", name: "Store B", logo: "https://via.placeholder.com/80" },
    { id: "3", name: "Store C", logo: "https://via.placeholder.com/80" },
    { id: "4", name: "Store D", logo: "https://via.placeholder.com/80" },
    { id: "5", name: "Store E", logo: "https://via.placeholder.com/80" },
    { id: "6", name: "Store F", logo: "https://via.placeholder.com/80" },
    { id: "7", name: "Store G", logo: "https://via.placeholder.com/80" },
];
const STATUS_ITEMS = [
    { id: 0, title: "Заказано", color: colors.grayDark, iconName: "bag-check-outline" },
    { id: 15, title: "На складе", color: colors.grayDark, iconName: "cube-outline" },
    { id: 16, title: "В пути", color: colors.grayDark, iconName: "navigate-outline" },
    {
        id: 3,
        title: "К выдаче",
        color: colors.grayDark,
        iconName: "checkmark-circle-outline",
    },
];
const mainSlide = [
    {
        title: "Мои\nмагазины",
        image: "basket-outline",
        page: "navigation/Shops",
    },
    {
        title: "Мой\nкалькулятор",
        image: "calculator-outline",
        page: "navigation/Calculator",
    },
    {
        title: "Мои\nадреса",
        image: "location-outline",
        page: "Adres",
    },

    {
        title: "Наша\nмедиа",
        isMedia: true,
    },
];
export { STATUS_ITEMS, buyForMestatuses, countries, hiddenRoutes, languages, mainSlide, mockStores, orderTabs, prohibitedProducts, tools, workingDays };
