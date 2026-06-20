const FILM_WORDS = [
  "ACTOR","ALIEN","AMOUR","ANNIE","ARIEL","AKIRA",
  "BABEL","BAMBI","BRAVE","BRICK","BULLY",
  "CAROL","CLICK","CRASH","CREED","DRIVE",
  "DUMBO","ENEMY","ELVIS","EVITA","FARGO",
  "JOKER","LOGAN","NIXON","MOANA","PEARL",
  "RANGO","RAMBO","ROCKY","SCENE","SEVEN","SHREK",
  "SPLIT","SIGNS","SMILE","SPEED","SULLY",
  "TAKEN","TENET","THIEF","WONKA",
  "ALIVE","ABYSS","LYNCH","NOLAN","PEELE",
  "WOODY","FRODO","GROOT","SIMBA","VADER",
  "DOBBY","AUDIO","BOOMS","CRANE","DOLLY",
  "FRAME","PROPS","REELS","SCENE","SCORE",
  "SOUND","STAGE","ANIME","CRIME","DRAMA",
  "INDIE","PIXAR","DAFOE","PESCI","KEANU"
];

let ALL_VALID = new Set(FILM_WORDS);

const WORD_INFO = {
  ACTOR: {
    category: "Performer",
    display: "Actor",
    description: "A professional who portrays a character within a story."
  },
  ALIEN: {
    category: "Film",
    display: "Alien (1979)",
    description: "Ridley Scott's sci-fi horror classic. During its return to the earth, commercial spaceship Nostromo intercepts a distress signal from a distant planet."
  },
  AMOUR: {
    category: "Film",
    display: "Amour (2012)",
    description: "Michael Haneke's Palme d'Or winner. Regarded as one of the best films of the 2010s"
  },
  ANNIE: {
    category: "Film",
    display: "Annie (1982/2014)",
    description: "Beloved musical adaptation."
  },
  ARIEL: {
    category: "Character",
    display: "Ariel",
    description: "Ariel is a fictional character in Walt Disney Pictures' animated film The Little Mermaid"
  },
  AKIRA: {
    category: "Film",
    display: "Akira (1988)",
    description: "Katsuhiro Otomo's landmark anime film. A secret military project endangers Neo-Tokyo when it turns a biker gang member into a rampaging psychic psychopath that only two teenagers and a group of psychics can stop."
  },
  BABEL: {
    category: "Film",
    display: "Babel (2006)",
    description: "Alejandro González Iñárritu's sprawling drama. Tragedy strikes a married couple vacationing in the Moroccan desert, which jumpstarts an interlocking story involving four different families."
  },
  BAMBI: {
    category: "Film",
    display: "Bambi (1942)",
    description: "Walt Disney's timeless animated classic. Bambi’s tale unfolds from season to season as the young prince of the forest learns about life, love, and friends."
  },
  BRAVE: {
    category: "Film",
    display: "Brave (2012)",
    description: "Pixar's Scottish adventure. Determined to make her own path in life, Princess Merida defies a custom that brings chaos to her kingdom. Granted one wish, Merida must rely on her bravery and her archery skills to undo a beastly curse."
  },
  BRICK: {
    category: "Film",
    display: "Brick (2005)",
    description: "Rian Johnson's neo-noir debut. A teenage loner pushes his way into the underworld of a high school crime ring to investigate the disappearance of his ex-girlfriend."
  },
  BULLY: {
    category: "Film",
    display: "Bully (2001)",
    description: "Larry Clark's unflinching drama. Based on the true story of a group of Florida teenagers who conspire to murder an abusive friend."
  },
  CAROL: {
    category: "Film",
    display: "Carol (2015)",
    description: "Todd Haynes' romantic drama set in 1950s New York. A young photographer falls for an older woman going through a difficult divorce."
  },
  CLICK: {
    category: "Film",
    display: "Click (2006)",
    description: "Adam Sandler's surprisingly emotional comedy. A workaholic architect gets a universal remote that controls time, and slowly realises he's been fast-forwarding through his own life."
  },
  CRASH: {
    category: "Film",
    display: "Crash (1996)",
    description: "Iconic David Cronenberg film.A car crash victim suddenly finds himself turned on by car accidents and becomes involved with an underground sub-culture of like-minded souls."
  },
  CREED: {
    category: "Film",
    display: "Creed (2015)",
    description: "Ryan Coogler's Rocky legacy sequel. The former World Heavyweight Champion Rocky Balboa serves as a trainer and mentor to Adonis Johnson, the son of his late friend and former rival Apollo Creed."
  },
  DRIVE: {
    category: "Film",
    display: "Drive (2011)",
    description: "Nicolas Winding Refn's thriller. A mysterious Hollywood action film stuntman gets in trouble with gangsters when he tries to help his neighbor's husband rob a pawn shop while serving as his getaway driver."
  },
  DUMBO: {
    category: "Film",
    display: "Dumbo (1941/2019)",
    description: "Ridiculed because of his enormous ears, a young circus elephant is assisted by a mouse to achieve his full potential."
  },
  ENEMY: {
    category: "Film",
    display: "Enemy (2013)",
    description: "Denis Villeneuve's surreal psychological thriller. A mild-mannered college professor investigates the life of an actor who looks exactly like him."
  },
  ELVIS: {
    category: "Film",
    display: "Elvis (2022)",
    description: "Baz Luhrmann's maximalist biopic. Austin Butler transforms into the King of Rock and Roll, told through the twisted lens of his manipulative manager Colonel Tom Parker."
  },
  EVITA: {
    category: "Film",
    display: "Evita (1996)",
    description: "Alan Parker's adaptation of the Andrew Lloyd Webber musical. a B-picture Argentinian actress who eventually became the wife of Argentinian president Juan Domingo Perón, and the most beloved and hated woman in Argentina."
  },
  FARGO: {
    category: "Film",
    display: "Fargo (1996)",
    description: "The Coen Brothers' darkly comic crime masterpiece. A car salesman's inept crime falls apart due to his and his henchmen's bungling and the persistent police work of a dogged detective."
  },
  JOKER: {
    category: "Film",
    display: "Joker (2019)",
    description: "Arthur Fleck, a party clown, leads an impoverished life with his ailing mother. However, when society shuns him and brands him as a freak, he decides to embrace the life of crime and chaos."
  },
  LOGAN: {
    category: "Film",
    display: "Logan (2017)",
    description: "James Mangold's superhero farewell. In a future where mutants are nearly extinct, an elderly and weary Logan leads a quiet life. But when Laura, a mutant child pursued by scientists, comes to him for help, he must get her to safety."
  },
  NIXON: {
    category: "Film",
    display: "Nixon (1995)",
    description: "Oliver Stone's political biopic. A biographical story of former U.S. President Richard Nixon, from his days as a young boy, to his eventual Presidency, which ended in shame."
  },
  MOANA: {
    category: "Film",
    display: "Moana (2016)",
    description: "Disney's Pacific Islander adventure. The daughter of a Polynesian chief sails beyond the reef to restore the heart of the ocean, joined by the demigod Maui."
  
  },
  PEARL: {
    category: "Film",
    display: "Pearl (2022)",
    description: "Ti West's prequel to X. In 1918, a young woman on the brink of madness pursues stardom in a desperate attempt to escape the drudgery, isolation, and lovelessness of life on her parents' farm."
  },
  RANGO: {
    category: "Film",
    display: "Rango (2011)",
    description: "Gore Verbinski's animated western. Rango is an ordinary chameleon who accidentally winds up in the town of Dirt, a lawless outpost in the Wild West in desperate need of a new sheriff."
  },
  RAMBO: {
    category: "Film",
    display: "Rambo (1982)",
    description: "Ted Kotcheff's surprisingly serious action film. Sylvester Stallone's traumatised Vietnam veteran John Rambo is pushed too far by a small-town sheriff."
  },
  ROCKY: {
    category: "Film",
    display: "Rocky (1976)",
    description: "John G. Avildsen's Best Picture winner. A small-time Philadelphia boxer gets a shot at the world heavyweight title. Sylvester Stallone wrote the script himself."
  },
  SEVEN: {
    category: "Film",
    display: "Se7en (1995)",
    description: "David Fincher's thriller. Two detectives hunt a serial killer using the seven deadly sins as his blueprint."
  },
  SHREK: {
    category: "Film",
    display: "Shrek (2001)",
    description: "DreamWorks' animated comedy. A mean lord exiles fairytale creatures to the swamp of a grumpy ogre, who must go on a quest and rescue a princess for the lord in order to get his land back."
  },
  SPLIT: {
    category: "Film",
    display: "Split (2016)",
    description: "M. Night Shyamalan's comeback thriller. James McAvoy plays a man with 24 distinct personalities who kidnaps three girls."
  },
  SIGNS: {
    category: "Film",
    display: "Signs (2002)",
    description: "M. Night Shyamalan's alien invasion film seen entirely from a farmhouse. Mel Gibson plays a former priest whose faith is tested."
  },
  SMILE: {
    category: "Film",
    display: "Smile (2022)",
    description: "Parker Finn's supernatural horror. A therapist witnesses a patient's disturbing suicide and becomes haunted by a sinister entity that spreads through trauma."
  },
  SPEED: {
    category: "Film",
    display: "Speed (1994)",
    description: "Jan de Bont's action thriller. A cop must prevent a bomb exploding on a city bus by keeping its speed above 50 mph. Featuring Keanu Reeves and Sandra Bullock at their best."
  

  },
  SULLY: {
    category: "Film",
    display: "Sully (2016)",
    description: "Clint Eastwood's drama about the Miracle on the Hudson. Tom Hanks plays Captain Chesley Sullenberger, who safely landed a plane on the Hudson River in 2009."
  },
  TAKEN: {
    category: "Film",
    display: "Taken (2008)",
    description: "Pierre Morel's action thriller that launched a franchise. Liam Neeson's ex-CIA operative hunts down the men who kidnapped his daughter."
  },
  
  TENET: {
    category: "Film",
    display: "Tenet (2020)",
    description: "Christopher Nolan's espionage thriller. A secret agent navigates a world where entropy can be reversed."
  },
  THIEF: {
    category: "Film",
    display: "Thief (1981)",
    description: "Michael Mann's feature debut. James Caan plays a professional safecracker who wants one last score before going straight."
  },
  WONKA: {
    category: "Film",
    display: "Wonka (2023)",
    description: "Paul King's prequel musical. Timothée Chalamet plays a young Willy Wonka arriving in a new city with dreams of opening a chocolate shop."
  },
  ALIVE: {
    category: "Film",
    display: "Alive (1993)",
    description: "Frank Marshall's survival drama. Based on the true story of a Uruguayan rugby team whose plane crashes in the Andes in 1972, and what they had to do to survive."
  },
  ABYSS: {
    category: "Film",
    display: "The Abyss (1989)",
    description: "James Cameron's ambitious underwater sci-fi. A civilian diving team encounters something extraordinary at the bottom of the ocean."
  },

  LYNCH: {
    category: "Director",
    display: "David Lynch",
    description: "American director behind Eraserhead, Blue Velvet, Mulholland Drive, and Twin Peaks. The undisputed master of cinematic surrealism and dream logic."
  },
  NOLAN: {
    category: "Director",
    display: "Christopher Nolan",
    description: "British-American director of Memento, The Dark Knight, Inception, Interstellar, Dunkirk, and Oppenheimer. Known for non-linear storytelling and practical effects."
  },
  PEELE: {
    category: "Director",
    display: "Jordan Peele",
    description: "American director of Get Out, Us, and Nope. Reinvented the horror genre. Get Out was one of the most profitable films of 2017."
  },

  WOODY: {
    category: "Character",
    display: "Woody — Toy Story",
    description: "Tom Hanks voices the pull-string cowboy and loyal leader of Andy's toys. One of Pixar's most iconic and emotionally complex characters across four films."
  },
  FRODO: {
    category: "Character",
    display: "Frodo Baggins — The Lord of the Rings",
    description: "The hobbit entrusted with destroying the One Ring. Played by Elijah Wood across Peter Jackson's trilogy."
  },
  GROOT: {
    category: "Character",
    display: "Groot — Guardians of the Galaxy",
    description: "The gentle tree-creature who only says \"I am Groot.\" Voiced by Vin Diesel. Baby Groot became one of the MCU's most beloved characters."
  },
  SIMBA: {
    category: "Character",
    display: "Simba — The Lion King",
    description: "The young lion prince who flees after his father Mufasa's death, only to return and reclaim his kingdom."
  },
  VADER: {
    category: "Character",
    display: "Darth Vader — Star Wars",
    description: "One of cinema's greatest villains. The former Jedi Knight Anakin Skywalker, now servant of the Emperor."
  },
  DOBBY: {
    category: "Character",
    display: "Dobby — Harry Potter",
    description: "The free house-elf who fiercely loves Harry Potter. Appeared in Chamber of Secrets and Deathly Hallows."
  },

  AUDIO: {
    category: "Filmmaking",
    display: "Audio",
    description: "The sound department responsible for capturing dialogue, ambient noise, and effects on set."
  },
  BOOMS: {
    category: "Equipment",
    display: "Boom Mic",
    description: "The long pole microphone held just out of frame to capture clean dialogue on set."
  },
  CRANE: {
    category: "Equipment",
    display: "Camera Crane",
    description: "A mechanical arm that lifts the camera high above the set for sweeping overhead shots."
  },
  DOLLY: {
    category: "Equipment",
    display: "Dolly Shot",
    description: "A camera mounted on a wheeled cart that moves smoothly along a track. The dolly zoom or Vertigo effect is one of cinema's most iconic techniques."
  },
  FRAME: {
    category: "Filmmaking",
    display: "Frame",
    description: "A single still image in a film strip. Cinema runs at 24 frames per second."
  },
  PROPS: {
    category: "Equipment",
    display: "Props",
    description: "Any object handled by actors on screen. The prop department sources, builds, and maintains everything from background dressing to hero objects central to the story."
  },
  REELS: {
    category: "Filmmaking",
    display: "Film Reels",
    description: "The physical spools of celluloid that film was shot and projected on. A standard 35mm reel holds about 10 minutes of footage."
  },
  SCENE: {
    category: "Filmmaking",
    display: "Scene",
    description: "A single continuous unit of action in a film, typically set in one location and time. Scripts are broken into scenes, and productions are scheduled scene by scene."
  },
  SCORE: {
    category: "Filmmaking",
    display: "Film Score",
    description: "The original music composed specifically for a film."
  },
  SOUND: {
    category: "Filmmaking",
    display: "Sound Design",
    description: "The process of crafting and manipulating the auditory world to enhance storytelling, mood, and emotional impact."
  },
  STAGE: {
    category: "Equipment",
    display: "Sound Stage",
    description: "A large indoor studio space where sets are built and filmed under controlled conditions."
  },

  ANIME: {
    category: "Genre",
    display: "Anime",
    description: "Japanese animated film and television. From Studio Ghibli's Spirited Away to Satoshi Kon's Perfect Blue."
  },
  CRIME: {
    category: "Genre",
    display: "Crime",
    description: "One of cinema's most enduring genres. Crime films explore power, morality, and consequence like no other genre."
  },
  DRAMA: {
    category: "Genre",
    display: "Drama",
    description: "The broadest and oldest genre in film. Character-driven stories exploring human emotion, conflict, and consequence."
  },
  INDIE: {
    category: "Genre",
    display: "Indie Film",
    description: "Films made outside the major studio system, typically with smaller budgets and more creative freedom."
  },
  PIXAR: {
    category: "Studio",
    display: "Pixar Animation Studios",
    description: "The studio behind Toy Story, Up, WALL-E, Inside Out, and more. Pixar pioneered computer-animated feature films and set the standard for emotionally intelligent storytelling in animation."
  },

  DAFOE: {
    category: "Actor",
    display: "Willem Dafoe",
    description: "One of cinema's most versatile character actors. Oscar-nominated for Platoon, Shadow of the Vampire, Florida Project, and At Eternity's Gate."
  },
  PESCI: {
    category: "Actor",
    display: "Joe Pesci",
    description: "Oscar winner for Goodfellas. Known for explosive, unpredictable performances in Raging Bull, Casino, and the Lethal Weapon series. Came out of retirement for The Irishman."
  },
  KEANU: {
    category: "Actor",
    display: "Keanu Reeves",
    description: "Star of The Matrix trilogy, John Wick, Speed, and Point Break."
  },
};