// Super Mario General Quiz - Game Logic & 300 Questions
// Game by Claude - Educational Platform Game

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 1000;
canvas.height = 600;

let gameState = {
    lives: 5,
    coins: 0,
    score: 0,
    level: 1,
    character: null,
    isPaused: false,
    gameStarted: false
};

// 300 EDUCATIONAL QUESTIONS (Math, Science, Geography)
const quizzes = [
    // MATH QUESTIONS (100)
    {q:"What is 2+2?",o:["3","4","5","6"],c:1,e:"2+2=4. Basic addition!"},
    {q:"What is 5+3?",o:["6","7","8","9"],c:2,e:"5+3=8. Add them together!"},
    {q:"What is 10-4?",o:["5","6","7","8"],c:1,e:"10-4=6. Subtraction!"},
    {q:"What is 7+2?",o:["8","9","10","11"],c:1,e:"7+2=9. Count up!"},
    {q:"What is 15-7?",o:["6","7","8","9"],c:2,e:"15-7=8. Take away 7!"},
    {q:"What is 4×2?",o:["6","8","10","12"],c:1,e:"4×2=8. Multiplication!"},
    {q:"What is 3×3?",o:["6","9","12","15"],c:1,e:"3×3=9. Three times three!"},
    {q:"What is 20÷4?",o:["4","5","6","7"],c:1,e:"20÷4=5. Division!"},
    {q:"What is 6+7?",o:["12","13","14","15"],c:1,e:"6+7=13!"},
    {q:"What is 9-3?",o:["5","6","7","8"],c:1,e:"9-3=6!"},
    {q:"What is 5×4?",o:["15","20","25","30"],c:1,e:"5×4=20!"},
    {q:"What is 12÷3?",o:["3","4","5","6"],c:1,e:"12÷3=4!"},
    {q:"What is 8+5?",o:["11","12","13","14"],c:2,e:"8+5=13!"},
    {q:"What is 11-6?",o:["4","5","6","7"],c:1,e:"11-6=5!"},
    {q:"What is 7×2?",o:["12","14","16","18"],c:1,e:"7×2=14!"},
    {q:"What is 18÷2?",o:["7","8","9","10"],c:2,e:"18÷2=9!"},
    {q:"What is 12+8?",o:["18","19","20","21"],c:2,e:"12+8=20!"},
    {q:"What is 14-9?",o:["4","5","6","7"],c:1,e:"14-9=5!"},
    {q:"What is 6×3?",o:["15","18","21","24"],c:1,e:"6×3=18!"},
    {q:"What is 25÷5?",o:["4","5","6","7"],c:1,e:"25÷5=5!"},
    {q:"What is 13+7?",o:["18","19","20","21"],c:2,e:"13+7=20!"},
    {q:"What is 17-8?",o:["7","8","9","10"],c:2,e:"17-8=9!"},
    {q:"What is 9×3?",o:["24","27","30","33"],c:1,e:"9×3=27!"},
    {q:"What is 16÷4?",o:["3","4","5","6"],c:1,e:"16÷4=4!"},
    {q:"What is 15+9?",o:["22","23","24","25"],c:2,e:"15+9=24!"},
    {q:"What is 20-12?",o:["6","7","8","9"],c:2,e:"20-12=8!"},
    {q:"What is 8×5?",o:["35","40","45","50"],c:1,e:"8×5=40!"},
    {q:"What is 30÷6?",o:["4","5","6","7"],c:1,e:"30÷6=5!"},
    {q:"What is 11+14?",o:["23","24","25","26"],c:2,e:"11+14=25!"},
    {q:"What is 22-7?",o:["13","14","15","16"],c:2,e:"22-7=15!"},
    {q:"What is 7×7?",o:["42","45","49","52"],c:2,e:"7×7=49!"},
    {q:"What is 36÷6?",o:["5","6","7","8"],c:1,e:"36÷6=6!"},
    {q:"What is 18+13?",o:["29","30","31","32"],c:2,e:"18+13=31!"},
    {q:"What is 25-16?",o:["7","8","9","10"],c:2,e:"25-16=9!"},
    {q:"What is 12×2?",o:["20","22","24","26"],c:2,e:"12×2=24!"},
    {q:"What is 40÷8?",o:["4","5","6","7"],c:1,e:"40÷8=5!"},
    {q:"What is 16+19?",o:["33","34","35","36"],c:2,e:"16+19=35!"},
    {q:"What is 30-14?",o:["14","15","16","17"],c:2,e:"30-14=16!"},
    {q:"What is 9×4?",o:["32","34","36","38"],c:2,e:"9×4=36!"},
    {q:"What is 45÷9?",o:["4","5","6","7"],c:1,e:"45÷9=5!"},
    {q:"What is 23+18?",o:["39","40","41","42"],c:2,e:"23+18=41!"},
    {q:"What is 35-19?",o:["14","15","16","17"],c:2,e:"35-19=16!"},
    {q:"What is 11×3?",o:["30","33","36","39"],c:1,e:"11×3=33!"},
    {q:"What is 50÷10?",o:["4","5","6","7"],c:1,e:"50÷10=5!"},
    {q:"What is 27+15?",o:["40","41","42","43"],c:2,e:"27+15=42!"},
    {q:"What is 40-23?",o:["15","16","17","18"],c:2,e:"40-23=17!"},
    {q:"What is 6×6?",o:["30","32","34","36"],c:3,e:"6×6=36!"},
    {q:"What is 42÷7?",o:["5","6","7","8"],c:1,e:"42÷7=6!"},
    {q:"What is 32+29?",o:["59","60","61","62"],c:2,e:"32+29=61!"},
    {q:"What is 50-28?",o:["20","21","22","23"],c:2,e:"50-28=22!"},
    {q:"What is 13×2?",o:["24","26","28","30"],c:1,e:"13×2=26!"},
    {q:"What is 56÷8?",o:["6","7","8","9"],c:1,e:"56÷8=7!"},
    {q:"What is 38+24?",o:["60","61","62","63"],c:2,e:"38+24=62!"},
    {q:"What is 60-37?",o:["21","22","23","24"],c:2,e:"60-37=23!"},
    {q:"What is 15×3?",o:["42","45","48","51"],c:1,e:"15×3=45!"},
    {q:"What is 63÷9?",o:["6","7","8","9"],c:1,e:"63÷9=7!"},
    {q:"What is 44+37?",o:["79","80","81","82"],c:2,e:"44+37=81!"},
    {q:"What is 70-42?",o:["26","27","28","29"],c:2,e:"70-42=28!"},
    {q:"What is 14×4?",o:["52","54","56","58"],c:2,e:"14×4=56!"},
    {q:"What is 72÷8?",o:["8","9","10","11"],c:1,e:"72÷8=9!"},
    {q:"What is 55+28?",o:["81","82","83","84"],c:2,e:"55+28=83!"},
    {q:"What is 80-49?",o:["29","30","31","32"],c:2,e:"80-49=31!"},
    {q:"What is 16×3?",o:["45","48","51","54"],c:1,e:"16×3=48!"},
    {q:"What is 81÷9?",o:["8","9","10","11"],c:1,e:"81÷9=9!"},
    {q:"What is 62+39?",o:["99","100","101","102"],c:2,e:"62+39=101!"},
    {q:"What is 90-56?",o:["32","33","34","35"],c:2,e:"90-56=34!"},
    {q:"What is 17×4?",o:["64","66","68","70"],c:2,e:"17×4=68!"},
    {q:"What is 100÷10?",o:["9","10","11","12"],c:1,e:"100÷10=10!"},
    {q:"What is 73+48?",o:["119","120","121","122"],c:2,e:"73+48=121!"},
    {q:"What is 100-67?",o:["31","32","33","34"],c:2,e:"100-67=33!"},
    {q:"What is 19×3?",o:["54","57","60","63"],c:1,e:"19×3=57!"},
    {q:"What is 88÷11?",o:["7","8","9","10"],c:1,e:"88÷11=8!"},
    {q:"What is 86+57?",o:["141","142","143","144"],c:2,e:"86+57=143!"},
    {q:"What is 120-78?",o:["40","41","42","43"],c:2,e:"120-78=42!"},
    {q:"What is 21×2?",o:["40","42","44","46"],c:1,e:"21×2=42!"},
    {q:"What is 96÷12?",o:["7","8","9","10"],c:1,e:"96÷12=8!"},
    {q:"What is 94+68?",o:["160","161","162","163"],c:2,e:"94+68=162!"},
    {q:"What is 150-89?",o:["59","60","61","62"],c:2,e:"150-89=61!"},
    {q:"What is 23×3?",o:["66","69","72","75"],c:1,e:"23×3=69!"},
    {q:"What is 144÷12?",o:["11","12","13","14"],c:1,e:"144÷12=12!"},
    {q:"What is 107+95?",o:["200","201","202","203"],c:2,e:"107+95=202!"},
    {q:"What is 200-123?",o:["75","76","77","78"],c:2,e:"200-123=77!"},
    {q:"What is 25×4?",o:["95","100","105","110"],c:1,e:"25×4=100!"},
    {q:"What is 150÷15?",o:["9","10","11","12"],c:1,e:"150÷15=10!"},
    {q:"What is 118+86?",o:["202","203","204","205"],c:2,e:"118+86=204!"},
    {q:"What is 250-167?",o:["81","82","83","84"],c:2,e:"250-167=83!"},
    {q:"What is 27×5?",o:["130","135","140","145"],c:1,e:"27×5=135!"},
    {q:"What is 180÷20?",o:["8","9","10","11"],c:1,e:"180÷20=9!"},
    {q:"What is 156+147?",o:["301","302","303","304"],c:2,e:"156+147=303!"},
    {q:"What is 300-189?",o:["109","110","111","112"],c:2,e:"300-189=111!"},
    {q:"What is 29×6?",o:["168","172","174","178"],c:2,e:"29×6=174!"},
    {q:"What is 200÷25?",o:["7","8","9","10"],c:1,e:"200÷25=8!"},
    {q:"What is 189+234?",o:["421","422","423","424"],c:2,e:"189+234=423!"},
    {q:"What is 400-267?",o:["131","132","133","134"],c:2,e:"400-267=133!"},
    {q:"What is 33×7?",o:["227","229","231","233"],c:2,e:"33×7=231!"},
    {q:"What is 250÷50?",o:["4","5","6","7"],c:1,e:"250÷50=5!"},
    {q:"What is half of 100?",o:["25","50","75","100"],c:1,e:"Half of 100 is 50!"},
    {q:"What is double of 25?",o:["25","50","75","100"],c:1,e:"Double 25 is 50!"},

    // SCIENCE QUESTIONS (100)
    {q:"Which planet is closest to the Sun?",o:["Venus","Mercury","Mars","Earth"],c:1,e:"Mercury is closest to the Sun!"},
    {q:"How many legs does a spider have?",o:["6","8","10","12"],c:1,e:"Spiders have 8 legs!"},
    {q:"What is the freezing point of water?",o:["0°C","10°C","32°C","100°C"],c:0,e:"Water freezes at 0°C!"},
    {q:"Which gas do plants absorb?",o:["Oxygen","Nitrogen","Carbon dioxide","Hydrogen"],c:2,e:"Plants absorb CO2!"},
    {q:"What is the largest planet?",o:["Mars","Jupiter","Saturn","Neptune"],c:1,e:"Jupiter is the largest planet!"},
    {q:"How many bones are in the human body?",o:["186","206","226","246"],c:1,e:"Adults have 206 bones!"},
    {q:"What is the boiling point of water?",o:["50°C","75°C","100°C","125°C"],c:2,e:"Water boils at 100°C!"},
    {q:"Which organ pumps blood?",o:["Liver","Heart","Kidney","Lung"],c:1,e:"The heart pumps blood!"},
    {q:"How many teeth do adults have?",o:["28","30","32","34"],c:2,e:"Adults have 32 teeth!"},
    {q:"What is the speed of light?",o:["100k km/s","200k km/s","300k km/s","400k km/s"],c:2,e:"Light travels at 300,000 km/s!"},
    {q:"Which is the largest ocean?",o:["Atlantic","Pacific","Indian","Arctic"],c:1,e:"The Pacific Ocean is largest!"},
    {q:"What is H2O?",o:["Oxygen","Hydrogen","Water","Carbon"],c:2,e:"H2O is water!"},
    {q:"How many continents are there?",o:["5","6","7","8"],c:2,e:"There are 7 continents!"},
    {q:"Which planet is called the Red Planet?",o:["Venus","Mars","Jupiter","Saturn"],c:1,e:"Mars is the Red Planet!"},
    {q:"What is the center of an atom?",o:["Electron","Proton","Neutron","Nucleus"],c:3,e:"The nucleus is the center!"},
    {q:"Which animal is the fastest on land?",o:["Lion","Cheetah","Horse","Leopard"],c:1,e:"Cheetahs run up to 120 km/h!"},
    {q:"What is photosynthesis?",o:["Plant breathing","Plant eating","Light to energy","Water absorption"],c:2,e:"Photosynthesis converts light to energy!"},
    {q:"How many hearts does an octopus have?",o:["1","2","3","4"],c:2,e:"Octopuses have 3 hearts!"},
    {q:"What is the smallest unit of life?",o:["Atom","Molecule","Cell","Organ"],c:2,e:"The cell is life's basic unit!"},
    {q:"Which is a renewable energy?",o:["Coal","Oil","Solar","Gas"],c:2,e:"Solar energy is renewable!"},
    {q:"What is the hardest natural substance?",o:["Gold","Iron","Diamond","Ruby"],c:2,e:"Diamond is the hardest!"},
    {q:"Which planet has rings?",o:["Mars","Jupiter","Saturn","Uranus"],c:2,e:"Saturn has beautiful rings!"},
    {q:"What is gravity?",o:["Push force","Pull force","Magnetic force","Electric force"],c:1,e:"Gravity is a pulling force!"},
    {q:"Which is NOT a mammal?",o:["Whale","Bat","Snake","Dolphin"],c:2,e:"Snakes are reptiles!"},
    {q:"What is evaporation?",o:["Water freezing","Water boiling","Liquid to gas","Gas to liquid"],c:2,e:"Evaporation is liquid to gas!"},
    {q:"How long does Earth take to orbit the Sun?",o:["12 months","365 days","1 year","All of these"],c:3,e:"Earth takes 365 days (1 year)!"},
    {q:"What is the largest mammal?",o:["Elephant","Blue whale","Giraffe","Polar bear"],c:1,e:"Blue whales are largest!"},
    {q:"Which gas do we breathe in?",o:["Nitrogen","Oxygen","Carbon dioxide","Hydrogen"],c:1,e:"We breathe oxygen!"},
    {q:"What causes tides?",o:["Sun","Moon","Wind","Earth's rotation"],c:1,e:"The Moon causes tides!"},
    {q:"Which is a conductor of electricity?",o:["Wood","Plastic","Copper","Rubber"],c:2,e:"Copper conducts electricity!"},
    {q:"What is condensation?",o:["Liquid to gas","Gas to liquid","Solid to gas","Liquid to solid"],c:1,e:"Condensation is gas to liquid!"},
    {q:"How many chambers does a human heart have?",o:["2","3","4","5"],c:2,e:"The heart has 4 chambers!"},
    {q:"Which is the hottest planet?",o:["Mercury","Venus","Mars","Jupiter"],c:1,e:"Venus is hottest!"},
    {q:"What is chlorophyll?",o:["Red pigment","Green pigment","Blue pigment","Yellow pigment"],c:1,e:"Chlorophyll is green!"},
    {q:"Which animal can change colors?",o:["Lion","Chameleon","Tiger","Bear"],c:1,e:"Chameleons change color!"},
    {q:"What is the Sun?",o:["Planet","Star","Satellite","Comet"],c:1,e:"The Sun is a star!"},
    {q:"Which is the largest land animal?",o:["Rhino","Hippo","Elephant","Giraffe"],c:2,e:"Elephants are largest on land!"},
    {q:"What is metamorphosis?",o:["Growth","Transformation","Reproduction","Migration"],c:1,e:"Metamorphosis is transformation!"},
    {q:"How many planets are in our solar system?",o:["7","8","9","10"],c:1,e:"There are 8 planets!"},
    {q:"What is photosynthesis product?",o:["Carbon dioxide","Water","Oxygen","Nitrogen"],c:2,e:"Plants produce oxygen!"},
    {q:"Which bird cannot fly?",o:["Eagle","Penguin","Sparrow","Crow"],c:1,e:"Penguins can't fly!"},
    {q:"What is the closest star to Earth?",o:["Sirius","Alpha Centauri","Proxima","The Sun"],c:3,e:"The Sun is our closest star!"},
    {q:"Which is a carnivore?",o:["Cow","Horse","Lion","Rabbit"],c:2,e:"Lions are carnivores!"},
    {q:"What causes seasons?",o:["Distance from Sun","Earth's tilt","Moon phases","Solar flares"],c:1,e:"Earth's tilt causes seasons!"},
    {q:"Which metal is liquid at room temperature?",o:["Iron","Gold","Mercury","Silver"],c:2,e:"Mercury is liquid at room temp!"},
    {q:"What is an ecosystem?",o:["Type of plant","Living & non-living things","Type of animal","Weather system"],c:1,e:"Ecosystems include all life and non-life!"},
    {q:"Which planet is known for the Great Red Spot?",o:["Mars","Jupiter","Saturn","Neptune"],c:1,e:"Jupiter has the Great Red Spot!"},
    {q:"What is pollination?",o:["Plant growth","Pollen transfer","Seed sprouting","Flower blooming"],c:1,e:"Pollination transfers pollen!"},
    {q:"Which is the longest bone?",o:["Humerus","Tibia","Femur","Fibula"],c:2,e:"The femur is longest!"},
    {q:"What do herbivores eat?",o:["Meat","Plants","Both","Neither"],c:1,e:"Herbivores eat plants!"},
    {q:"Which force slows down moving objects?",o:["Gravity","Magnetism","Friction","Inertia"],c:2,e:"Friction slows motion!"},
    {q:"What is the Milky Way?",o:["Candy","Our galaxy","A planet","A star"],c:1,e:"The Milky Way is our galaxy!"},
    {q:"Which is an amphibian?",o:["Snake","Lizard","Frog","Fish"],c:2,e:"Frogs are amphibians!"},
    {q:"What is Newton's first law?",o:["Action-reaction","Inertia","Acceleration","Gravity"],c:1,e:"An object at rest stays at rest!"},
    {q:"Which planet rotates on its side?",o:["Mars","Jupiter","Uranus","Neptune"],c:2,e:"Uranus rotates sideways!"},
    {q:"What is the function of roots?",o:["Make food","Absorb water","Produce flowers","Attract insects"],c:1,e:"Roots absorb water!"},
    {q:"Which is the smallest planet?",o:["Mercury","Mars","Venus","Pluto"],c:0,e:"Mercury is smallest!"},
    {q:"What is metamorphic rock?",o:["From magma","From pressure/heat","From erosion","From animals"],c:1,e:"Metamorphic rocks form from heat/pressure!"},
    {q:"Which animal has the longest lifespan?",o:["Elephant","Turtle","Whale","Parrot"],c:1,e:"Some turtles live 100+ years!"},
    {q:"What is the Aurora Borealis?",o:["Star explosion","Northern lights","Solar eclipse","Meteor shower"],c:1,e:"Aurora Borealis is Northern Lights!"},
    {q:"Which is an invertebrate?",o:["Fish","Bird","Jellyfish","Frog"],c:2,e:"Jellyfish have no backbone!"},
    {q:"What is a lunar eclipse?",o:["Sun blocks Moon","Earth blocks Sun","Moon blocks Sun","Earth's shadow on Moon"],c:3,e:"Lunar eclipse is Earth's shadow on Moon!"},
    {q:"Which part of plant makes food?",o:["Root","Stem","Leaf","Flower"],c:2,e:"Leaves make food via photosynthesis!"},
    {q:"What is kinetic energy?",o:["Stored energy","Motion energy","Heat energy","Light energy"],c:1,e:"Kinetic energy is motion!"},
    {q:"Which is a natural satellite?",o:["ISS","Moon","Hubble","GPS"],c:1,e:"The Moon is Earth's natural satellite!"},
    {q:"What is extinct?",o:["Rare","Endangered","No longer exists","Protected"],c:2,e:"Extinct means no longer exists!"},
    {q:"Which layer protects Earth from UV rays?",o:["Troposphere","Ozone layer","Mesosphere","Ionosphere"],c:1,e:"Ozone protects from UV!"},
    {q:"What is a comet?",o:["Burning meteor","Icy space rock","Dead star","Mini planet"],c:1,e:"Comets are icy space rocks!"},
    {q:"Which has the most powerful bite?",o:["Lion","Shark","Crocodile","T-Rex"],c:2,e:"Crocodiles have strongest bite!"},
    {q:"What is the water cycle?",o:["Ocean currents","Water's continuous movement","Rain patterns","River flow"],c:1,e:"Water cycle is continuous movement!"},
    {q:"Which is the fastest bird?",o:["Eagle","Falcon","Hawk","Condor"],c:1,e:"Peregrine falcons dive at 320 km/h!"},
    {q:"What is a black hole?",o:["Empty space","Super dense star","Dark planet","Space tunnel"],c:1,e:"Black holes are super dense!"},
    {q:"Which blood type is universal donor?",o:["A","B","AB","O"],c:3,e:"Type O is universal donor!"},
    {q:"What causes earthquakes?",o:["Volcanic eruptions","Tectonic plates","Ocean waves","Wind pressure"],c:1,e:"Earthquakes from tectonic plates!"},
    {q:"Which is the loudest animal?",o:["Lion","Elephant","Blue whale","Howler monkey"],c:2,e:"Blue whales reach 188 decibels!"},
    {q:"What is mitochondria?",o:["Cell wall","Powerhouse of cell","Genetic material","Cell membrane"],c:1,e:"Mitochondria is cell's powerhouse!"},
    {q:"Which planet has the most moons?",o:["Jupiter","Saturn","Uranus","Neptune"],c:1,e:"Saturn has 80+ moons!"},
    {q:"What is symbiosis?",o:["Competition","Mutual benefit","Parasitism","Predation"],c:1,e:"Symbiosis is mutual benefit!"},
    {q:"Which is a reptile?",o:["Frog","Snake","Bat","Dolphin"],c:1,e:"Snakes are reptiles!"},
    {q:"What is absolute zero?",o:["0°C","100°C","-273°C","1000°C"],c:2,e:"Absolute zero is -273°C!"},
    {q:"Which animal has the best memory?",o:["Dog","Cat","Elephant","Dolphin"],c:2,e:"Elephants have amazing memory!"},
    {q:"What is the Doppler effect?",o:["Light bending","Color change","Sound frequency change","Temperature change"],c:2,e:"Doppler effect changes sound frequency!"},
    {q:"Which is the tallest tree species?",o:["Oak","Pine","Redwood","Maple"],c:2,e:"Redwoods grow 100+ meters!"},
    {q:"What is antibiotics used for?",o:["Viruses","Bacteria","Fungi","Parasites"],c:1,e:"Antibiotics kill bacteria!"},
    {q:"Which planet has the shortest day?",o:["Earth","Mars","Jupiter","Saturn"],c:2,e:"Jupiter's day is only 10 hours!"},
    {q:"What is homeostasis?",o:["Growth","Balance/stability","Reproduction","Evolution"],c:1,e:"Homeostasis maintains balance!"},
    {q:"Which is the most abundant gas in Earth's atmosphere?",o:["Oxygen","Carbon dioxide","Nitrogen","Argon"],c:2,e:"Nitrogen makes up 78%!"},
    {q:"What is a supernova?",o:["New star","Star explosion","Black hole","Galaxy"],c:1,e:"Supernova is star explosion!"},
    {q:"Which animal never sleeps?",o:["Dolphin","Shark","Elephant","Bullfrog"],c:3,e:"Bullfrogs don't sleep!"},
    {q:"What is the function of white blood cells?",o:["Carry oxygen","Fight infection","Clot blood","Digest food"],c:1,e:"White blood cells fight infection!"},
    {q:"Which is the driest place on Earth?",o:["Sahara","Atacama Desert","Death Valley","Antarctica"],c:1,e:"Atacama is driest!"},
    {q:"What is DNA?",o:["Energy molecule","Genetic code","Protein","Enzyme"],c:1,e:"DNA is genetic code!"},
    {q:"Which bird can fly backwards?",o:["Eagle","Hummingbird","Parrot","Owl"],c:1,e:"Hummingbirds fly backwards!"},
    {q:"What is the Big Bang Theory?",o:["Star formation","Universe origin","Planet creation","Galaxy collision"],c:1,e:"Big Bang explains universe origin!"},
    {q:"Which sense is strongest in dogs?",o:["Sight","Hearing","Smell","Touch"],c:2,e:"Dogs have amazing smell!"},
    {q:"What is the greenhouse effect?",o:["Plant growth","Heat trapping","Ozone depletion","Ice melting"],c:1,e:"Greenhouse effect traps heat!"},

    // GEOGRAPHY & GENERAL KNOWLEDGE (100)
    {q:"What is the capital of France?",o:["London","Paris","Rome","Berlin"],c:1,e:"Paris is the capital of France!"},
    {q:"Which is the tallest mountain?",o:["K2","Everest","Kilimanjaro","Denali"],c:1,e:"Mount Everest is 8,849m tall!"},
    {q:"How many colors in a rainbow?",o:["5","6","7","8"],c:2,e:"Rainbows have 7 colors!"},
    {q:"What is the largest desert?",o:["Sahara","Arabian","Gobi","Antarctic"],c:3,e:"Antarctica is largest desert!"},
    {q:"Which country has the most people?",o:["USA","India","China","Indonesia"],c:2,e:"China has 1.4+ billion people!"},
    {q:"What is the longest river?",o:["Amazon","Nile","Yangtze","Mississippi"],c:1,e:"The Nile is 6,650 km long!"},
    {q:"How many sides does a hexagon have?",o:["5","6","7","8"],c:1,e:"Hexagons have 6 sides!"},
    {q:"Which continent is the largest?",o:["Africa","Asia","Europe","Americas"],c:1,e:"Asia is largest!"},
    {q:"What is the capital of Japan?",o:["Kyoto","Tokyo","Osaka","Hiroshima"],c:1,e:"Tokyo is Japan's capital!"},
    {q:"How many hours in a day?",o:["12","20","24","30"],c:2,e:"There are 24 hours in a day!"},
    {q:"Which ocean is the smallest?",o:["Arctic","Indian","Atlantic","Pacific"],c:0,e:"Arctic Ocean is smallest!"},
    {q:"What shape is a ball?",o:["Square","Triangle","Circle","Rectangle"],c:2,e:"A ball is a sphere (circle in 3D)!"},
    {q:"Which language is most spoken?",o:["English","Spanish","Mandarin","Hindi"],c:2,e:"Mandarin has most speakers!"},
    {q:"How many months in a year?",o:["10","11","12","13"],c:2,e:"There are 12 months!"},
    {q:"What is the capital of USA?",o:["New York","Washington DC","Los Angeles","Chicago"],c:1,e:"Washington DC is US capital!"},
    {q:"Which is the smallest continent?",o:["Europe","Antarctica","Australia","South America"],c:2,e:"Australia is smallest!"},
    {q:"How many days in a leap year?",o:["364","365","366","367"],c:2,e:"Leap years have 366 days!"},
    {q:"What is the capital of India?",o:["Mumbai","Delhi","Bangalore","Kolkata"],c:1,e:"New Delhi is India's capital!"},
    {q:"Which country is largest by area?",o:["USA","Canada","Russia","China"],c:2,e:"Russia is largest by area!"},
    {q:"How many minutes in an hour?",o:["50","60","70","80"],c:1,e:"60 minutes in an hour!"},
    {q:"What is the capital of Egypt?",o:["Cairo","Alexandria","Giza","Luxor"],c:0,e:"Cairo is Egypt's capital!"},
    {q:"Which sea is the saltiest?",o:["Red Sea","Dead Sea","Black Sea","Caspian Sea"],c:1,e:"Dead Sea is saltiest!"},
    {q:"How many seconds in a minute?",o:["50","60","70","80"],c:1,e:"60 seconds in a minute!"},
    {q:"What is the capital of UK?",o:["Manchester","London","Birmingham","Liverpool"],c:1,e:"London is UK capital!"},
    {q:"Which waterfall is largest?",o:["Niagara","Victoria","Angel","Iguazu"],c:1,e:"Victoria Falls is massive!"},
    {q:"How many weeks in a year?",o:["50","51","52","53"],c:2,e:"52 weeks in a year!"},
    {q:"What is the capital of Italy?",o:["Milan","Venice","Rome","Florence"],c:2,e:"Rome is Italy's capital!"},
    {q:"Which is the deepest ocean?",o:["Atlantic","Pacific","Indian","Arctic"],c:1,e:"Pacific has deepest point!"},
    {q:"How many days in a week?",o:["5","6","7","8"],c:2,e:"7 days in a week!"},
    {q:"What is the capital of Spain?",o:["Barcelona","Madrid","Seville","Valencia"],c:1,e:"Madrid is Spain's capital!"},
    {q:"Which country invented pizza?",o:["USA","France","Italy","Greece"],c:2,e:"Pizza from Naples, Italy!"},
    {q:"How many seasons are there?",o:["2","3","4","5"],c:2,e:"4 seasons!"},
    {q:"What is the Great Wall of?",o:["India","China","Japan","Korea"],c:1,e:"Great Wall of China!"},
    {q:"Which city is called the Big Apple?",o:["Los Angeles","Chicago","New York","Miami"],c:2,e:"New York is the Big Apple!"},
    {q:"How many years in a decade?",o:["5","10","15","20"],c:1,e:"A decade is 10 years!"},
    {q:"What is the Statue of Liberty made of?",o:["Gold","Iron","Copper","Bronze"],c:2,e:"Statue of Liberty is copper!"},
    {q:"Which country has pyramids?",o:["Mexico","Egypt","Peru","Greece"],c:1,e:"Egypt has pyramids!"},
    {q:"How many years in a century?",o:["50","100","150","200"],c:1,e:"A century is 100 years!"},
    {q:"What is the Eiffel Tower made of?",o:["Wood","Stone","Iron","Concrete"],c:2,e:"Eiffel Tower is iron!"},
    {q:"Which country is shaped like a boot?",o:["Spain","Greece","Italy","Portugal"],c:2,e:"Italy is boot-shaped!"},
    {q:"How many days in February (non-leap)?",o:["28","29","30","31"],c:0,e:"February has 28 days!"},
    {q:"What does USA stand for?",o:["United States of America","Union of States","Universal States","United Southern America"],c:0,e:"United States of America!"},
    {q:"Which country has kangaroos?",o:["New Zealand","India","Australia","Africa"],c:2,e:"Kangaroos are from Australia!"},
    {q:"How many letters in the English alphabet?",o:["24","25","26","27"],c:2,e:"26 letters from A to Z!"},
    {q:"What is the capital of Germany?",o:["Munich","Berlin","Hamburg","Frankfurt"],c:1,e:"Berlin is Germany's capital!"},
    {q:"Which country gifted the Statue of Liberty?",o:["England","France","Spain","Italy"],c:1,e:"France gave the Statue!"},
    {q:"How many vowels in English?",o:["4","5","6","7"],c:1,e:"5 vowels: A, E, I, O, U!"},
    {q:"What is the capital of Russia?",o:["St Petersburg","Moscow","Kiev","Minsk"],c:1,e:"Moscow is Russia's capital!"},
    {q:"Which is the world's smallest country?",o:["Monaco","Vatican City","Liechtenstein","San Marino"],c:1,e:"Vatican City is smallest!"},
    {q:"How many degrees in a circle?",o:["180","270","360","450"],c:2,e:"A circle has 360 degrees!"},
    {q:"What is the capital of Canada?",o:["Toronto","Ottawa","Montreal","Vancouver"],c:1,e:"Ottawa is Canada's capital!"},
    {q:"Which country has the most islands?",o:["Indonesia","Philippines","Sweden","Norway"],c:2,e:"Sweden has 267,000+ islands!"},
    {q:"How many sides in a triangle?",o:["2","3","4","5"],c:1,e:"Triangles have 3 sides!"},
    {q:"What is the capital of Australia?",o:["Sydney","Melbourne","Canberra","Brisbane"],c:2,e:"Canberra is Australia's capital!"},
    {q:"Which river flows through London?",o:["Seine","Rhine","Thames","Danube"],c:2,e:"The Thames flows through London!"},
    {q:"How many sides in a square?",o:["3","4","5","6"],c:1,e:"Squares have 4 equal sides!"},
    {q:"What is the capital of Brazil?",o:["Rio","São Paulo","Brasília","Salvador"],c:2,e:"Brasília is Brazil's capital!"},
    {q:"Which country is also a continent?",o:["Greenland","Iceland","Australia","Madagascar"],c:2,e:"Australia is both!"},
    {q:"How many sides in a pentagon?",o:["4","5","6","7"],c:1,e:"Pentagons have 5 sides!"},
    {q:"What is the Taj Mahal?",o:["Palace","Temple","Tomb","Fort"],c:2,e:"Taj Mahal is a tomb!"},
    {q:"Which ocean is between Africa and Australia?",o:["Atlantic","Pacific","Indian","Arctic"],c:2,e:"Indian Ocean!"},
    {q:"How many corners in a cube?",o:["6","8","10","12"],c:1,e:"Cubes have 8 corners!"},
    {q:"What is Big Ben?",o:["Palace","Clock tower","Bridge","Castle"],c:1,e:"Big Ben is a clock tower!"},
    {q:"Which country has maple leaf flag?",o:["USA","Australia","Canada","Ireland"],c:2,e:"Canada has maple leaf!"},
    {q:"How many faces in a cube?",o:["4","6","8","12"],c:1,e:"Cubes have 6 faces!"},
    {q:"What is the Colosseum?",o:["Palace","Arena","Temple","Theater"],c:1,e:"Colosseum is an arena!"},
    {q:"Which sea is between Europe and Africa?",o:["Red Sea","Mediterranean","Black Sea","Dead Sea"],c:1,e:"Mediterranean Sea!"},
    {q:"How many degrees in a right angle?",o:["45","60","90","180"],c:2,e:"Right angle is 90 degrees!"},
    {q:"What is Mount Fuji?",o:["Temple","Volcano","Tower","Monument"],c:1,e:"Mount Fuji is a volcano!"},
    {q:"Which city has the Leaning Tower?",o:["Rome","Venice","Pisa","Milan"],c:2,e:"Leaning Tower of Pisa!"},
    {q:"How many edges in a cube?",o:["8","10","12","14"],c:2,e:"Cubes have 12 edges!"},
    {q:"What is the Sphinx?",o:["Pyramid","Statue","Temple","Tomb"],c:1,e:"Sphinx is a statue!"},
    {q:"Which country is called Land of Rising Sun?",o:["China","Korea","Japan","Thailand"],c:2,e:"Japan is Land of Rising Sun!"},
    {q:"How many days in April?",o:["28","29","30","31"],c:2,e:"April has 30 days!"},
    {q:"What is Stonehenge?",o:["Castle","Stone circle","Church","Palace"],c:1,e:"Stonehenge is a stone circle!"},
    {q:"Which country has most time zones?",o:["USA","Russia","France","China"],c:2,e:"France has 12 time zones!"},
    {q:"How many sides in an octagon?",o:["6","7","8","9"],c:2,e:"Octagons have 8 sides!"},
    {q:"What is the Golden Gate?",o:["Palace","Bridge","Tower","Gate"],c:1,e:"Golden Gate is a bridge!"},
    {q:"Which strait separates Asia and North America?",o:["Gibraltar","Bering","Dover","Malacca"],c:1,e:"Bering Strait!"},
    {q:"How many days in July?",o:["28","29","30","31"],c:3,e:"July has 31 days!"},
    {q:"What is Machu Picchu?",o:["Temple","Ancient city","Palace","Pyramid"],c:1,e:"Machu Picchu is ancient city!"},
    {q:"Which lake is the deepest?",o:["Superior","Baikal","Victoria","Michigan"],c:1,e:"Lake Baikal is 1,642m deep!"},
    {q:"How many degrees in a straight line?",o:["90","120","180","360"],c:2,e:"Straight line is 180 degrees!"},
    {q:"What are the Northern Lights?",o:["Stars","Aurora","Clouds","Lightning"],c:1,e:"Northern Lights are Aurora!"},
    {q:"Which country has most UNESCO sites?",o:["France","China","Italy","Spain"],c:2,e:"Italy has 50+ UNESCO sites!"},
    {q:"How many months have 31 days?",o:["5","6","7","8"],c:2,e:"7 months have 31 days!"},
    {q:"What is the Panama Canal?",o:["Bridge","Waterway","Road","Railway"],c:1,e:"Panama Canal is a waterway!"},
    {q:"Which desert has the most sand?",o:["Gobi","Atacama","Sahara","Arabian"],c:2,e:"Sahara is largest hot desert!"},
    {q:"How many players in a soccer team?",o:["9","10","11","12"],c:2,e:"Soccer teams have 11 players!"},
    {q:"What is the Kremlin?",o:["Palace","Fortress","Cathedral","Museum"],c:1,e:"Kremlin is a fortress!"},
    {q:"Which is the world's longest wall?",o:["Hadrian's Wall","Great Wall","Berlin Wall","Western Wall"],c:1,e:"Great Wall of China!"},
    {q:"How many strings on a guitar?",o:["4","5","6","7"],c:2,e:"Guitars have 6 strings!"},
    {q:"What is Venice famous for?",o:["Mountains","Canals","Deserts","Forests"],c:1,e:"Venice has canals!"},
    {q:"Which is the largest island?",o:["Madagascar","Greenland","Borneo","New Guinea"],c:1,e:"Greenland is largest island!"}
];

// Game variables
const player = {x:100,y:400,width:40,height:48,velocityX:0,velocityY:0,speed:5,jumpPower:15,isJumping:false,direction:'right',invincible:false,invincibleTimer:0};
let platforms=[],questionBlocks=[],coins=[],enemies=[],pipes=[],clouds=[],particles=[],currentQuiz=null,quizCallback=null,usedQuestions=[];
const keys={left:false,right:false,up:false};

// Select Character
function selectCharacter(character) {
    gameState.character = character;
    document.getElementById('characterSelect').style.display = 'none';
    gameState.gameStarted = true;
    initLevel();
    showLevelAnnouncement();
    gameLoop();
}

// Initialize Level
function initLevel() {
    platforms = [];
    questionBlocks = [];
    coins = [];
    enemies = [];
    pipes = [];
    particles = [];
    const level = gameState.level;
    
    // Ground
    for(let i = 0; i < 50; i++) {
        platforms.push({x: i * 40, y: 550, width: 40, height: 50, type: 'ground'});
    }
    
    // Level-specific layouts
    if(level === 1) {
        createPlatform(200,450,4);
        createPlatform(400,350,3);
        createPlatform(600,300,4);
        createPlatform(850,400,3);
        questionBlocks.push({x:250,y:350,active:true,hasQuiz:true});
        questionBlocks.push({x:450,y:250,active:true,hasQuiz:true});
        questionBlocks.push({x:700,y:200,active:true,hasQuiz:true});
        for(let i = 0; i < 10; i++) coins.push({x:150 + i * 80,y:300 - Math.sin(i) * 50,collected:false,frame:0});
        enemies.push({x:300,y:510,width:40,height:40,direction:1,speed:1.5});
        enemies.push({x:500,y:510,width:40,height:40,direction:-1,speed:1.5});
        pipes.push({x:900,y:470,width:60,height:80,isGoal:true});
    } else if(level === 2) {
        createPlatform(150,500,3);
        createPlatform(250,450,3);
        createPlatform(350,400,3);
        createPlatform(450,350,3);
        createPlatform(550,300,3);
        createPlatform(700,250,4);
        questionBlocks.push({x:300,y:400,active:true,hasQuiz:true});
        questionBlocks.push({x:500,y:250,active:true,hasQuiz:true});
        questionBlocks.push({x:750,y:200,active:true,hasQuiz:true});
        questionBlocks.push({x:650,y:500,active:true,hasQuiz:true});
        for(let i = 0; i < 12; i++) coins.push({x:100 + i * 70,y:250 - Math.cos(i) * 40,collected:false,frame:0});
        enemies.push({x:200,y:510,width:40,height:40,direction:1,speed:2});
        enemies.push({x:400,y:510,width:40,height:40,direction:-1,speed:2});
        enemies.push({x:600,y:510,width:40,height:40,direction:1,speed:2.5});
        pipes.push({x:850,y:470,width:60,height:80,isGoal:true});
    } else {
        // Dynamic generation for level 3+
        const numPlatforms = Math.min(10 + level, 20);
        const numEnemies = Math.min(3 + level, 8);
        const numQuestions = Math.min(3 + level, 10);
        const numCoins = Math.min(10 + level * 2, 30);
        
        for(let i = 0; i < numPlatforms; i++) {
            const x = 100 + Math.random() * 700;
            const y = 200 + Math.random() * 300;
            const w = 2 + Math.floor(Math.random() * 3);
            createPlatform(x, y, w);
        }
        
        for(let i = 0; i < numQuestions; i++) {
            questionBlocks.push({x:150 + Math.random() * 700,y:150 + Math.random() * 300,active:true,hasQuiz:true});
        }
        
        for(let i = 0; i < numCoins; i++) {
            coins.push({x:100 + i * (800 / numCoins),y:200 + Math.sin(i * 0.5) * 100,collected:false,frame:0});
        }
        
        for(let i = 0; i < numEnemies; i++) {
            enemies.push({x:150 + i * 120,y:510,width:40,height:40,direction:i % 2 === 0 ? 1 : -1,speed:2.5 + level * 0.3});
        }
        
        pipes.push({x:900,y:470,width:60,height:80,isGoal:true});
    }
    
    // Refresh clouds
    if(clouds.length === 0) {
        for(let i = 0; i < 8; i++) {
            clouds.push({x:Math.random() * 1000,y:Math.random() * 200,speed:0.3 + Math.random() * 0.5,size:40 + Math.random() * 30});
        }
    }
    
    player.x = 100;
    player.y = 400;
    player.velocityX = 0;
    player.velocityY = 0;
}

function createPlatform(startX, y, count) {
    for(let i = 0; i < count; i++) {
        platforms.push({x: startX + i * 40, y: y, width: 40, height: 20, type: 'brick'});
    }
}

// Show Quiz
function showQuiz(callback) {
    gameState.isPaused = true;
    let availableQuizzes = quizzes.filter(q => !usedQuestions.includes(q));
    if(availableQuizzes.length === 0) {
        usedQuestions = [];
        availableQuizzes = quizzes;
    }
    const quiz = availableQuizzes[Math.floor(Math.random() * availableQuizzes.length)];
    usedQuestions.push(quiz);
    currentQuiz = quiz;
    quizCallback = callback;
    
    document.getElementById('quizQuestion').textContent = quiz.q;
    const optionsDiv = document.getElementById('quizOptions');
    optionsDiv.innerHTML = '';
    
    quiz.o.forEach((option, index) => {
        const div = document.createElement('div');
        div.className = 'quiz-option';
        div.textContent = option;
        div.onclick = () => answerQuiz(index);
        optionsDiv.appendChild(div);
    });
    
    document.getElementById('quizOverlay').style.display = 'block';
    document.getElementById('quiz').style.display = 'block';
}

function answerQuiz(answerIndex) {
    const correct = answerIndex === currentQuiz.c;
    const explanationDiv = document.getElementById('explanation');
    const explanationTitle = document.getElementById('explanationTitle');
    const explanationText = document.getElementById('explanationText');
    const optionsDiv = document.getElementById('quizOptions');
    
    optionsDiv.style.pointerEvents = 'none';
    explanationDiv.style.display = 'block';
    explanationText.textContent = currentQuiz.e;
    
    if(correct) {
        explanationDiv.className = 'correct';
        explanationTitle.textContent = '✅ CORRECT! Well Done!';
    } else {
        explanationDiv.className = 'wrong';
        explanationTitle.textContent = '❌ Wrong - Learn This!';
    }
}

function closeQuiz() {
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('quizOverlay').style.display = 'none';
    document.getElementById('explanation').style.display = 'none';
    document.getElementById('quizOptions').style.pointerEvents = 'auto';
    gameState.isPaused = false;
    const correct = document.getElementById('explanation').className.includes('correct');
    if(quizCallback) quizCallback(correct);
}

// Update Game
function update() {
    if(gameState.isPaused || !gameState.gameStarted) return;
    
    // Player movement
    if(keys.left) {
        player.velocityX = -player.speed;
        player.direction = 'left';
    } else if(keys.right) {
        player.velocityX = player.speed;
        player.direction = 'right';
    } else {
        player.velocityX = 0;
    }
    
    if(keys.up && !player.isJumping) {
        player.velocityY = -player.jumpPower;
        player.isJumping = true;
    }
    
    // Physics
    player.velocityY += 0.8;
    player.y += player.velocityY;
    player.x += player.velocityX;
    
    // Boundaries
    if(player.x < 0) player.x = 0;
    if(player.x > canvas.width - player.width) player.x = canvas.width - player.width;
    
    // Platform collisions
    platforms.forEach(platform => {
        if(checkCollision(player, platform)) {
            if(player.velocityY > 0) {
                player.y = platform.y - player.height;
                player.velocityY = 0;
                player.isJumping = false;
            }
        }
    });
    
    // Question block collisions
    questionBlocks.forEach(block => {
        if(block.active) {
            const blockBox = {x: block.x, y: block.y, width: 40, height: 40};
            const playerHead = {x: player.x, y: player.y, width: player.width, height: 10};
            if(checkCollision(playerHead, blockBox) && player.velocityY < 0) {
                if(block.hasQuiz) {
                    showQuiz((correct) => {
                        if(correct) {
                            block.active = false;
                            gameState.coins += 5;
                            gameState.score += 100;
                            createParticles(block.x + 20, block.y, '#ffd700');
                        } else {
                            gameState.score = Math.max(0, gameState.score - 20);
                        }
                        updateHUD();
                    });
                }
            }
        }
    });
    
    // Coin collisions
    coins.forEach(coin => {
        if(!coin.collected && checkCollision(player, {...coin, width: 30, height: 30})) {
            coin.collected = true;
            gameState.coins++;
            gameState.score += 10;
            createParticles(coin.x, coin.y, '#ffd700');
            updateHUD();
        }
        coin.frame = (coin.frame + 0.1) % 360;
    });
    
    // Enemy collisions
    enemies.forEach(enemy => {
        enemy.x += enemy.direction * enemy.speed;
        if(enemy.x < 50 || enemy.x > 900) {
            enemy.direction *= -1;
        }
        if(!player.invincible && checkCollision(player, enemy)) {
            if(player.velocityY > 0 && player.y < enemy.y - 20) {
                showQuiz((correct) => {
                    if(correct) {
                        enemy.x = -100;
                        gameState.score += 50;
                        player.velocityY = -10;
                        createParticles(enemy.x, enemy.y, '#ff0000');
                    } else {
                        loseLife();
                    }
                    updateHUD();
                });
            } else {
                loseLife();
            }
        }
    });
    
    // Pipe collision
    pipes.forEach(pipe => {
        if(pipe.isGoal && checkCollision(player, pipe)) {
            levelComplete();
        }
    });
    
    // Clouds
    clouds.forEach(cloud => {
        cloud.x += cloud.speed;
        if(cloud.x > canvas.width + 100) {
            cloud.x = -100;
        }
    });
    
    // Particles
    particles = particles.filter(p => {
        p.y -= p.speedY;
        p.x += p.speedX;
        p.life--;
        p.speedY -= 0.2;
        return p.life > 0;
    });
    
    // Invincibility
    if(player.invincible) {
        player.invincibleTimer--;
        if(player.invincibleTimer <= 0) {
            player.invincible = false;
        }
    }
    
    // Fall off
    if(player.y > canvas.height) {
        loseLife();
    }
}

// Render Game
function render() {
    // Sky gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#5c94fc');
    gradient.addColorStop(0.7, '#87ceeb');
    gradient.addColorStop(1, '#98d8c8');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Clouds
    clouds.forEach(cloud => {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(cloud.x, cloud.y, cloud.size * 0.5, 0, Math.PI * 2);
        ctx.arc(cloud.x + cloud.size * 0.4, cloud.y, cloud.size * 0.6, 0, Math.PI * 2);
        ctx.arc(cloud.x + cloud.size * 0.8, cloud.y, cloud.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
    });
    
    // Platforms
    platforms.forEach(platform => {
        if(platform.type === 'ground') {
            ctx.fillStyle = '#8B4513';
            ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
            ctx.fillStyle = '#228B22';
            ctx.fillRect(platform.x, platform.y, platform.width, 8);
        } else {
            ctx.fillStyle = '#CD853F';
            ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
            ctx.strokeStyle = '#8B4513';
            ctx.lineWidth = 2;
            ctx.strokeRect(platform.x, platform.y, platform.width, platform.height);
        }
    });
    
    // Question blocks
    questionBlocks.forEach(block => {
        if(block.active) {
            ctx.fillStyle = '#FFD700';
            ctx.fillRect(block.x, block.y, 40, 40);
            ctx.strokeStyle = '#FFA500';
            ctx.lineWidth = 3;
            ctx.strokeRect(block.x, block.y, 40, 40);
            ctx.fillStyle = '#FFF';
            ctx.font = '24px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('?', block.x + 20, block.y + 28);
        } else {
            ctx.fillStyle = '#8B4513';
            ctx.fillRect(block.x, block.y, 40, 40);
        }
    });
    
    // Coins
    coins.forEach(coin => {
        if(!coin.collected) {
            const scale = Math.abs(Math.sin(coin.frame));
            ctx.save();
            ctx.translate(coin.x + 15, coin.y + 15);
            ctx.scale(scale, 1);
            ctx.fillStyle = '#FFD700';
            ctx.beginPath();
            ctx.arc(0, 0, 15, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#FFA500';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.restore();
        }
    });
    
    // Enemies
    enemies.forEach(enemy => {
        if(enemy.x > -50 && enemy.x < canvas.width) {
            ctx.fillStyle = '#8B4513';
            ctx.fillRect(enemy.x + 5, enemy.y + 10, 30, 25);
            ctx.fillStyle = '#654321';
            ctx.fillRect(enemy.x, enemy.y, 40, 15);
            ctx.fillStyle = '#FFF';
            ctx.fillRect(enemy.x + 8, enemy.y + 3, 8, 8);
            ctx.fillRect(enemy.x + 24, enemy.y + 3, 8, 8);
            ctx.fillStyle = '#000';
            ctx.fillRect(enemy.x + 10, enemy.y + 5, 4, 4);
            ctx.fillRect(enemy.x + 26, enemy.y + 5, 4, 4);
            ctx.fillStyle = '#654321';
            ctx.fillRect(enemy.x + 5, enemy.y + 35, 10, 5);
            ctx.fillRect(enemy.x + 25, enemy.y + 35, 10, 5);
        }
    });
    
    // Pipes
    pipes.forEach(pipe => {
        ctx.fillStyle = '#228B22';
        ctx.fillRect(pipe.x, pipe.y, pipe.width, pipe.height);
        ctx.fillStyle = '#32CD32';
        ctx.fillRect(pipe.x - 5, pipe.y - 10, pipe.width + 10, 15);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fillRect(pipe.x + 5, pipe.y, 10, pipe.height);
    });
    
    // Player
    if(!player.invincible || Math.floor(Date.now() / 100) % 2 === 0) {
        const emoji = gameState.character === 'mario' ? '🧑' : '👸';
        ctx.font = '48px Arial';
        ctx.textAlign = 'center';
        if(player.direction === 'right') {
            ctx.fillText(emoji, player.x + player.width / 2, player.y + player.height - 5);
        } else {
            ctx.save();
            ctx.translate(player.x + player.width / 2, player.y + player.height / 2);
            ctx.scale(-1, 1);
            ctx.fillText(emoji, 0, player.height / 2 - 5);
            ctx.restore();
        }
    }
    
    // Particles
    particles.forEach(p => {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life / 30;
        ctx.fillRect(p.x, p.y, 5, 5);
        ctx.globalAlpha = 1;
    });
}

// Helper functions
function checkCollision(obj1, obj2) {
    return obj1.x < obj2.x + obj2.width &&
           obj1.x + obj1.width > obj2.x &&
           obj1.y < obj2.y + obj2.height &&
           obj1.y + obj1.height > obj2.y;
}

function createParticles(x, y, color) {
    for(let i = 0; i < 10; i++) {
        particles.push({
            x: x,
            y: y,
            speedX: (Math.random() - 0.5) * 5,
            speedY: Math.random() * 5,
            life: 30,
            color: color
        });
    }
}

function loseLife() {
    gameState.lives--;
    updateHUD();
    player.invincible = true;
    player.invincibleTimer = 120;
    player.x = 100;
    player.y = 400;
    player.velocityX = 0;
    player.velocityY = 0;
    if(gameState.lives <= 0) {
        gameOver();
    }
}

function levelComplete() {
    gameState.isPaused = true;
    const levelNames = ["Tutorial Complete!", "Staircase Mastered!", "Floating Islands Conquered!", "Cave Explorer!", "Sky Castle Champion!", "Master Level " + (gameState.level - 5) + " Complete!"];
    const nextLevelNames = ["Next: Staircase Challenge", "Next: Floating Islands", "Next: Underground Cave", "Next: Sky Castle", "Next: Advanced Level " + (gameState.level - 4), "Next: Master Level " + (gameState.level - 4)];
    const msgIndex = Math.min(gameState.level - 1, 5);
    document.getElementById('levelMessage').textContent = levelNames[msgIndex];
    document.getElementById('levelStats').textContent = nextLevelNames[msgIndex] + " | Score: " + gameState.score;
    document.getElementById('levelComplete').style.display = 'block';
}

function nextLevel() {
    document.getElementById('levelComplete').style.display = 'none';
    gameState.level++;
    gameState.isPaused = false;
    showLevelAnnouncement();
    updateHUD();
    initLevel();
}

function showLevelAnnouncement() {
    const levelTitles = ["LEVEL 1 - Tutorial", "LEVEL 2 - Staircase Challenge", "LEVEL 3 - Floating Islands", "LEVEL 4 - Underground Cave", "LEVEL 5 - Sky Castle", "LEVEL " + gameState.level + " - Master Challenge"];
    const levelDescriptions = ["Learn the basics!", "Climb your way up!", "Jump between islands!", "Explore the dark depths!", "Reach for the clouds!", "Ultimate test of skill!"];
    const index = Math.min(gameState.level - 1, 5);
    document.getElementById('announceTitle').textContent = levelTitles[index];
    document.getElementById('announceSubtitle').textContent = levelDescriptions[index];
    const announceDiv = document.getElementById('levelAnnounce');
    announceDiv.style.display = 'block';
    setTimeout(() => {
        announceDiv.style.display = 'none';
    }, 3000);
}

function gameOver() {
    gameState.isPaused = true;
    document.getElementById('finalScore').textContent = gameState.score;
    document.getElementById('finalCoins').textContent = gameState.coins;
    document.getElementById('gameOver').style.display = 'block';
}

function restartGame() {
    gameState.lives = 5;
    gameState.coins = 0;
    gameState.score = 0;
    gameState.level = 1;
    gameState.isPaused = false;
    usedQuestions = [];
    document.getElementById('gameOver').style.display = 'none';
    updateHUD();
    initLevel();
}

function updateHUD() {
    const livesDisplay = document.getElementById('livesDisplay');
    livesDisplay.innerHTML = '';
    for(let i = 0; i < gameState.lives; i++) {
        livesDisplay.innerHTML += '<span class="heart">❤️</span>';
    }
    document.getElementById('coins').textContent = gameState.coins;
    document.getElementById('score').textContent = gameState.score;
    document.getElementById('level').textContent = gameState.level;
}

function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
}

// Keyboard controls
document.addEventListener('keydown', (e) => {
    if(e.key === 'ArrowLeft') keys.left = true;
    if(e.key === 'ArrowRight') keys.right = true;
    if(e.key === 'ArrowUp' || e.key === ' ') keys.up = true;
});

document.addEventListener('keyup', (e) => {
    if(e.key === 'ArrowLeft') keys.left = false;
    if(e.key === 'ArrowRight') keys.right = false;
    if(e.key === 'ArrowUp' || e.key === ' ') keys.up = false;
});

// Initialize HUD
updateHUD();
