import { AlertProps } from "antd/lib/alert";

export enum TransactionType {
    expense = "expense",
    income = "income"
}

export enum TransactionStatus {
    new = "new",
    approved = "approved",
    disapproved = "disapproved"
}

export enum RecurringType {
    weekly = "weekly",
    monthly = "monthly",
    yearly = "yearly"
}

export enum PanelActionTypes {
    view = "view",
    edit = "edit",
    add = "add"
}

export enum IntroActionType {
    login = "login",
    signup = "signup"
}

export enum AlertType {
    success = "success",
    info = "info",
    warning = "warning",
    error = "error"
}

export enum TaggableType {
    transaction = "App\\Http\\Models\\Transaction",
    budget = "App\\Http\\Models\\Budget"
}

export enum UserStatusEnum {
    active = "active",
    unactivated = "unactivated",
    deleted = "deleted"
}

export enum AvailableIcons {
    faAddressCard = "address-card",
    faAmbulance = "ambulance",
    faAnchor = "anchor",
    faArchive = "archive",
    faAtlas = "atlas",
    faAtom = "atom",
    faAward = "award",
    faBaby = "baby",
    faBabyCarriage = "baby-carriage",
    faBalanceScale = "balance-scale",
    faBandAid = "band-aid",
    faBath = "bath",
    faBatteryFull = "battery-full",
    faBed = "bed",
    faBeer = "beer",
    faBell = "bell",
    faBible = "bible",
    faBicycle = "bicycle",
    faBinoculars = "binoculars",
    faBirthdayCake = "birthday-cake",
    faBlender = "blender",
    faBook = "book",
    faBowlingBall = "bowling-ball",
    faBriefcase = "briefcase",
    faBriefcaseMedical = "briefcase-medical",
    faBroadcastTower = "broadcast-tower",
    faBug = "bug",
    faBuilding = "building",
    faBurn = "burn",
    faBus = "bus",
    faCalculator = "calculator",
    faCalendar = "calendar",
    faCalendarAlt = "calendar-alt",
    faCamera = "camera",
    faCannabis = "cannabis",
    faCapsules = "capsules",
    faCarBattery = "car-battery",
    faCar = "car",
    faCarCrash = "car-crash",
    faCarrot = "carrot",
    faCat = "cat",
    faChair = "chair",
    faChartArea = "chart-area",
    faChartBar = "chart-bar",
    faChartPie = "chart-pie",
    faChess = "chess",
    faChild = "child",
    faChurch = "church",
    faClinicMedical = "clinic-medical",
    faClipboard  = "clipboard",
    faClipboardList  = "clipboard-list",
    faClock = "clock",
    faCloud = "cloud",
    faCocktail = "cocktail",
    faCode = "code",
    faCodeBranch = "code-branch",
    faCoffee = "coffee",
    faCog = "cog",
    faCogs = "cogs",
    faCoins = "coins",
    faComment = "comment",
    faCompactDisc = "compact-disc",
    faConciergeBell = "concierge-bell",
    faCookie = "cookie",
    faCookieBite = "cookie-bite",
    faCopy = "copy",
    faCouch = "couch",
    faCreditCard = "credit-card",
    faCross = "cross",
    faCubes = "cubes",
    faCut = "cut",
    faDatabase = "database",
    faDesktop = "desktop",
    faDice = "dice",
    faDna = "dna",
    faDollarSign = "dollar-sign",
    faDog = "dog",
    faDrum = "drum",
    faDrumstickBite = "drumstick-bite",
    faDumbbell = "dumbbell",
    faDungeon = "dungeon",
    faEdit = "edit",
    faEnvelope = "envelope",
    faFeather = "feather",
    faFile = "file",
    faFileInvoiceDollar = "file-invoice-dollar",
    faFilm = "film",
    faFire = "fire",
    faFirstAid = "first-aid",
    faFish = "fish",
    faFlask = "flask",
    faFolder = "folder",
    faFootballBall = "football-ball",
    faFutbol = "futbol",
    faGamepad = "gamepad",
    faGasPump = "gas-pump",
    faGavel = "gavel",
    faGem = "gem",
    faGift = "gift",
    faGlassCheers = "glass-cheers",
    faGlassMartini = "glass-martini",
    faGlassWhiskey = "glass-whiskey",
    faGlasses = "glasses",
    faGlobeAmericas = "globe-americas",
    faGolfBall = "golf-ball",
    faGraduationCap = "graduation-cap",
    faGuitar = "guitar",
    faHamburger = "hamburger",
    faHammer = "hammer",
    faHandshake = "handshake",
    faHardHat = "hard-hat",
    faHdd = "hdd",
    faHeadphones = "headphones",
    faHeart = "heart",
    faHelicopter = "helicopter",
    faHome = "home",
    faHospital = "hospital",
    faHotTub = "hot-tub",
    faHotel = "hotel",
    faHourglass = "hourglass",
    faIceCream = "ice-cream",
    faIdBadge = "id-badge",
    faIdCard = "id-card",
    faImage = "image",
    faImages = "images",
    faInbox = "inbox",
    faLandmark = "landmark",
    faLaptop = "laptop",
    faLeaf = "leaf",
    faLifeRing = "life-ring",
    faList = "list",
    faListAlt = "list-alt",
    faLock = "lock",
    faLocationArrow = "location-arrow",
    faMailBulk = "mail-bulk",
    faMap = "map",
    faMapMarked = "map-marked",
    faMapMarkerAlt = "map-marker-alt",
    faMapPin = "map-pin",
    faMarker = "marker",
    faMedal = "medal",
    faMedkit = "medkit",
    faMicrophone = "microphone",
    faMicroscope = "microscope",
    faMobile = "mobile",
    faMoneyBill = "money-bill",
    faMotorcycle = "motorcycle",
    faMugHot = "mug-hot",
    faMusic = "music",
    faNewspaper = "newspaper",
    faPaintBrush = "paint-brush",
    faPalette = "palette",
    faPhone = "phone",
    faPiggyBank = "piggy-bank",
    faPizzaSlice = "pizza-slice",
    faPlane = "plane",
    faPlug = "plug",
    faPortrait = "portrait",
    faRocket = "rocket",
    faRuler = "ruler",
    faRunning = "running",
    faSave = "save",
    faSchool = "school",
    faScrewdriver = "screwdriver",
    faServer = "server",
    faShippingFast = "shipping-fast",
    faShoppingCart = "shopping-cart",
    faShuttleVan = "shuttle-van",
    faSkiing = "skiing",
    faSmoking = "smoking",
    faSnowplow = "snowplow",
    faStar = "star",
    faStickyNote = "sticky-note",
    faStore = "store",
    faStreetView = "street-view",
    faSubway = "subway",
    faSwimmer = "swimmer",
    faSyringe = "syringe",
    faTablet = "tablet",
    faTableTennis = "table-tennis",
    faTag = "tag",
    faTaxi = "taxi",
    faTerminal = "terminal",
    faThermometerHalf = "thermometer-half",
    faTicketAlt = "ticket-alt",
    faTint = "tint",
    faToilet = "toilet",
    faTools = "tools",
    faTractor = "tractor",
    faTrain = "train",
    faTrashAlt = "trash-alt",
    faTruck = "truck",
    faTv = "tv",
    faUniversity = "university",
    faUser = "user",
    faUserGraduate = "user-graduate",
    faUtensils = "utensils",
    faVideo = "video",
    faWalking = "walking",
    faWallet = "wallet",
    faWarehouse = "warehouse",
    faWheelchair = "wheelchair",
    faWifi = "wifi",
    faWineBottle = "wine-bottle",
    faWineGlassAlt = "wine-glass-alt",
    faWrench = "wrench"
}

export interface LoadingProps {
    onToggleLoading(action: boolean): void;
}

export interface BudgetFigures {
    used: number;
    budgetTotal: number;
}

export interface BudgetDialCustomColors {
    start: string;
    end: string;
}

export interface ErrorDisplay {
    error: boolean;
    type: AlertType | undefined;
    msgs: string[];
}

interface Timestamps {
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export interface DateRange {
    start: any;
    end: any;
}

export interface Recurring extends Timestamps {
    recurring_type: RecurringType;
    start_at: string;
    end_at: string;
}

export interface RecurringUndefined {
    recurring_type: RecurringType | undefined;
    start_at: string | undefined;
    end_at: string | undefined;
    created_at: string | undefined;
    updated_at: string | undefined;
    deleted_at: string | null | undefined;
}

export interface Transaction extends Timestamps {
    id: number;
    recurring_id: number;
    submitted_by: number;
    title: string;
    description: string | undefined;
    amount: number;
    type: TransactionType;
    status: TransactionStatus;
    occurred_at: string;
}

export interface TransactionWithRecurring extends Transaction {
    recurring: Recurring | undefined;
}

export interface TransactionWithUndefined {
    id: number | undefined;
    recurring_id: number | undefined;
    submitted_by: number | undefined;
    title: string | undefined;
    description: string | undefined;
    amount: number | undefined;
    type: TransactionType | undefined;
    status: TransactionStatus | undefined;
    occurred_at: string | undefined;
    recurring: RecurringUndefined;
    created_at: string | undefined;
    updated_at: string | undefined;
    deleted_at: string | null | undefined;
}

export interface Tag extends Timestamps {
    id: number;
    title: string;
    slug: string;
    description: string;
    selected?: boolean;
    transactions?: Transaction[];
}

export interface Budget extends Timestamps {
    id: number;
    user_id: number;
    title: string;
    slug: string;
    description?: string;
    icon: string;
    amount: number;
    tags?: Tag[];
}

export interface PaginatedListResults {
    from: number;
    to: number;
    total: number;
    last_page: number;
    current_page: number;
    per_page: number;
    last_page_url: string | null;
    next_page_url: string | null;
    prev_page_url: string | null;
    path: string | null;
    first_page_url: string | null;
    data: any;
}

export interface AccountUserPivot {
    account_id: number;
    user_id: number;
}

export interface Account extends Timestamps {
    created_by: number;
    description: string;
    id: number;
    pivot: AccountUserPivot;
    account_id: number;
    user_id: number;
    title: string;
}

export interface User extends Timestamps {
    accounts: Account[];
    api_token: string;
    email: string;
    first_name: string;
    id: number;
    last_name: string;
    reset_token: string;
    status: UserStatusEnum;
    profile: string;
}

export interface TransactionSummaryDetails {
    expenseTotal: number;
    incomeTotal: number;
    remainingTotal: number;
}
