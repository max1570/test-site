const FILM_WORDS = [
  "ALIEN","AMOUR","ANNIE","ARIEL","AKIRA",
  "BABEL","BAMBI","BRAVE","BRICK","BULLY",
  "CAROL","CLICK","CRASH","CREED","DRIVE",
  "DUMBO","ENEMY","ELVIS","EVITA","FARGO",
  "JOKER","LOGAN","NIXON","MOANA","MOVIE","PEARL",
  "RANGO","RAMBO","ROCKY","SCENE","SEVEN","SHREK",
  "SPLIT","SIGNS","SMILE","SPEED","SULLY",
  "TAKEN","TANGO","TENET","THIEF","WONKA",
  "ALIVE","ABYSS","LYNCH","NOLAN","PEELE",
  "WOODY","FRODO","GROOT","SIMBA","VADER",
  "DOBBY","AUDIO","BOOMS","CRANE","DOLLY",
  "FRAME","PROPS","REELS","SCENE","SCORE",
  "SOUND","STAGE","ANIME","CRIME","DRAMA",
  "INDIE","PIXAR","DAFOE","PESCI","KEANU"
];

let ALL_VALID = new Set(FILM_WORDS);

const WORD_INFO = {
  // ── Films ──
  ALIEN: {
    category: "Film",
    display: "Alien (1979)",
    description: "Ridley Scott's sci-fi horror classic. A crew aboard the Nostromo encounters a deadly extraterrestrial creature. One of the most influential horror films ever made."
  },
  AMOUR: {
    category: "Film",
    display: "Amour (2012)",
    description: "Michael Haneke's Palme d'Or winner. A devastating portrait of an elderly couple facing illness and loss. Widely considered one of the greatest films of the 2010s."
  },
  ANNIE: {
    category: "Film",
    display: "Annie (1982)",
    description: "The beloved musical adaptation. A plucky orphan girl charms her way into the heart of billionaire Oliver Warbucks. Tomorrow, tomorrow, you're always a day away."
  },
  ARIEL: {
    category: "Film",
    display: "Ariel (1988)",
    description: "Aki Kaurismäki's deadpan Finnish drama. A unemployed miner drifts through misfortune after losing his job. Part of Kaurismäki's acclaimed Proletariat Trilogy."
  },
  AKIRA: {
    category: "Film",
    display: "Akira (1988)",
    description: "Katsuhiro Otomo's landmark anime film. Set in a dystopian Neo-Tokyo, it follows a biker gang caught in a government psychic experiment gone wrong. It changed animation forever."
  },
  BABEL: {
    category: "Film",
    display: "Babel (2006)",
    description: "Alejandro González Iñárritu's sprawling drama. Four interconnected stories across Morocco, Japan, Mexico, and the US explore miscommunication and tragedy on a global scale."
  },
  BAMBI: {
    category: "Film",
    display: "Bambi (1942)",
    description: "Walt Disney's timeless animated classic. A young deer navigates the beauty and brutality of the forest. Famous for one of the most emotionally devastating moments in cinema history."
  },
  BRAVE: {
    category: "Film",
    display: "Brave (2012)",
    description: "Pixar's Scottish adventure. Princess Merida defies tradition and accidentally transforms her mother into a bear. The first Pixar film with a female lead."
  },
  BRICK: {
    category: "Film",
    display: "Brick (2005)",
    description: "Rian Johnson's neo-noir debut. A high schooler investigates his ex-girlfriend's murder using hardboiled detective tropes transplanted into a suburban California setting."
  },
  BULLY: {
    category: "Film",
    display: "Bully (2001)",
    description: "Larry Clark's unflinching drama. Based on the true story of a group of Florida teenagers who conspire to murder an abusive friend. Raw, disturbing, and hard to forget."
  },
  CAROL: {
    category: "Film",
    display: "Carol (2015)",
    description: "Todd Haynes' romantic drama set in 1950s New York. A young photographer falls for an older woman going through a difficult divorce. Cate Blanchett and Rooney Mara are both extraordinary."
  },
  CLICK: {
    category: "Film",
    display: "Click (2006)",
    description: "Adam Sandler's surprisingly emotional comedy. A workaholic architect gets a universal remote that controls time, and slowly realises he's been fast-forwarding through his own life."
  },
  CRASH: {
    category: "Film",
    display: "Crash (2004)",
    description: "Paul Haggis' controversial Best Picture winner. Interconnected stories of racial tension in Los Angeles over 36 hours. Love it or hate it, it sparked conversation."
  },
  CREED: {
    category: "Film",
    display: "Creed (2015)",
    description: "Ryan Coogler's Rocky legacy sequel. Adonis Creed, son of Apollo, trains under Rocky Balboa to forge his own legacy. Michael B. Jordan gives one of the decade's best performances."
  },
  DRIVE: {
    category: "Film",
    display: "Drive (2011)",
    description: "Nicolas Winding Refn's neon-soaked thriller. A stoic Hollywood stunt driver moonlights as a getaway driver. Ryan Gosling barely speaks and says everything."
  },
  DUMBO: {
    category: "Film",
    display: "Dumbo (1941)",
    description: "Disney's gentle classic about a big-eared elephant who discovers he can fly. Only 64 minutes long and still manages to wreck you emotionally."
  },
  ENEMY: {
    category: "Film",
    display: "Enemy (2013)",
    description: "Denis Villeneuve's surreal psychological thriller. A man discovers his exact double living in the same city. Jake Gyllenhaal plays both. The ending will stay with you."
  },
  ELVIS: {
    category: "Film",
    display: "Elvis (2022)",
    description: "Baz Luhrmann's maximalist biopic. Austin Butler transforms into the King of Rock and Roll, told through the twisted lens of his manipulative manager Colonel Tom Parker."
  },
  EVITA: {
    category: "Film",
    display: "Evita (1996)",
    description: "Alan Parker's adaptation of the Andrew Lloyd Webber musical. Madonna stars as Eva Perón, the First Lady of Argentina who rose from poverty to political icon."
  },
  FARGO: {
    category: "Film",
    display: "Fargo (1996)",
    description: "The Coen Brothers' darkly comic crime masterpiece. A botched kidnapping in snowy Minnesota unravels spectacularly. Frances McDormand's Marge Gunderson is one of cinema's greatest characters."
  },
  JOKER: {
    category: "Film",
    display: "Joker (2019)",
    description: "Todd Phillips' divisive origin story. Joaquin Phoenix delivers a haunting performance as Arthur Fleck, a failed comedian whose descent into madness births one of fiction's greatest villains."
  },
  LOGAN: {
    category: "Film",
    display: "Logan (2017)",
    description: "James Mangold's superhero farewell. An aging, broken Wolverine takes a young mutant girl across a bleak near-future America. The superhero film that didn't feel like one."
  },
  NIXON: {
    category: "Film",
    display: "Nixon (1995)",
    description: "Oliver Stone's sprawling political biopic. Anthony Hopkins plays the 37th US President across decades of ambition, paranoia, and self-destruction. Three and a half hours of pure Stone."
  },
  MOANA: {
    category: "Film",
    display: "Moana (2016)",
    description: "Disney's Pacific Islander adventure. The daughter of a Polynesian chief sails beyond the reef to restore the heart of the ocean, joined by the demigod Maui."
  },
  MOVIE: {
    category: "Cinema",
    display: "Movie",
    description: "Does this really need an explanation..."
  },
  PEARL: {
    category: "Film",
    display: "Pearl (2022)",
    description: "Ti West's prequel to X. Mia Goth gives a career-defining performance as a young woman on a remote farm in 1918 whose desperate dreams curdle into violence."
  },
  RANGO: {
    category: "Film",
    display: "Rango (2011)",
    description: "Gore Verbinski's absurdist animated western. A chameleon accidentally becomes sheriff of a dying desert town. Far stranger and more cinematic than any animated film had any right to be."
  },
  RAMBO: {
    category: "Film",
    display: "Rambo (1982)",
    description: "Ted Kotcheff's surprisingly serious action film. Sylvester Stallone's traumatised Vietnam veteran John Rambo is pushed too far by a small-town sheriff. The sequels got bigger; this one hit harder."
  },
  ROCKY: {
    category: "Film",
    display: "Rocky (1976)",
    description: "John G. Avildsen's Best Picture winner. A small-time Philadelphia boxer gets a shot at the world heavyweight title. Sylvester Stallone wrote the script himself. The underdog story to end all underdog stories."
  },
  SEVEN: {
    category: "Film",
    display: "Se7en (1995)",
    description: "David Fincher's pitch-black thriller. Two detectives hunt a serial killer using the seven deadly sins as his blueprint. What's in the box? You already know."
  },
  SHREK: {
    category: "Film",
    display: "Shrek (2001)",
    description: "DreamWorks' genre-defining animated comedy. A grumpy ogre reluctantly rescues a princess to reclaim his swamp. Somehow both a fairy tale parody and a genuinely touching story about acceptance."
  },
  SPLIT: {
    category: "Film",
    display: "Split (2016)",
    description: "M. Night Shyamalan's comeback thriller. James McAvoy plays a man with 24 distinct personalities who kidnaps three girls. The final scene recontextualises everything."
  },
  SIGNS: {
    category: "Film",
    display: "Signs (2002)",
    description: "M. Night Shyamalan's alien invasion film seen entirely from a farmhouse. Mel Gibson plays a former priest whose faith is tested. Masterclass in building dread with almost nothing."
  },
  SMILE: {
    category: "Film",
    display: "Smile (2022)",
    description: "Parker Finn's supernatural horror. A therapist witnesses a patient's disturbing suicide and becomes haunted by a sinister entity that spreads through trauma. Genuinely unsettling."
  },
  SPEED: {
    category: "Film",
    display: "Speed (1994)",
    description: "Jan de Bont's relentless action thriller. A bomb is rigged to explode if a LA city bus drops below 50mph. Keanu Reeves and Sandra Bullock at their most charismatic."
  },
  SULLY: {
    category: "Film",
    display: "Sully (2016)",
    description: "Clint Eastwood's drama about the Miracle on the Hudson. Tom Hanks plays Captain Chesley Sullenberger, who safely landed a crippled plane on the Hudson River in 2009."
  },
  TAKEN: {
    category: "Film",
    display: "Taken (2008)",
    description: "Pierre Morel's action thriller that launched a franchise. Liam Neeson's ex-CIA operative hunts down the men who kidnapped his daughter. Home of cinema's most quoted phone call."
  },
  TANGO: {
    category: "Film",
    display: "Tango & Cash (1989)",
    description: "A buddy cop action film pairing Sylvester Stallone and Kurt Russell as rival detectives framed for murder. Gloriously over-the-top 80s excess."
  },
  TENET: {
    category: "Film",
    display: "Tenet (2020)",
    description: "Christopher Nolan's time-bending espionage thriller. A secret agent navigates a world where entropy can be reversed. Visually extraordinary, narratively exhausting — in the best possible way."
  },
  THIEF: {
    category: "Film",
    display: "Thief (1981)",
    description: "Michael Mann's feature debut. James Caan plays a professional safecracker who wants one last score before going straight. Slick, stylish, and ahead of its time."
  },
  WONKA: {
    category: "Film",
    display: "Wonka (2023)",
    description: "Paul King's prequel musical. Timothée Chalamet plays a young Willy Wonka arriving in a new city with dreams of opening a chocolate shop. Charming and surprisingly sweet."
  },
  ALIVE: {
    category: "Film",
    display: "Alive (1993)",
    description: "Frank Marshall's survival drama. Based on the true story of a Uruguayan rugby team whose plane crashes in the Andes in 1972, and what they had to do to survive."
  },
  ABYSS: {
    category: "Film",
    display: "The Abyss (1989)",
    description: "James Cameron's ambitious underwater sci-fi. A civilian diving team encounters something extraordinary at the bottom of the ocean. The extended cut is a different film entirely."
  },

  // ── Directors ──
  LYNCH: {
    category: "Director",
    display: "David Lynch",
    description: "American director behind Eraserhead, Blue Velvet, Mulholland Drive, and Twin Peaks. The undisputed master of cinematic surrealism and dream logic."
  },
  NOLAN: {
    category: "Director",
    display: "Christopher Nolan",
    description: "British-American director of Memento, The Dark Knight, Inception, Interstellar, Dunkirk, and Oppenheimer. Known for non-linear storytelling and practical effects on an epic scale."
  },
  PEELE: {
    category: "Director",
    display: "Jordan Peele",
    description: "American director of Get Out, Us, and Nope. Reinvented the horror genre with sharp social commentary. Get Out was one of the most profitable films of 2017."
  },

  // ── Characters ──
  WOODY: {
    category: "Character",
    display: "Woody — Toy Story",
    description: "Tom Hanks voices the pull-string cowboy and loyal leader of Andy's toys. One of Pixar's most iconic and emotionally complex characters across four films."
  },
  FRODO: {
    category: "Character",
    display: "Frodo Baggins — The Lord of the Rings",
    description: "The hobbit entrusted with destroying the One Ring. Played by Elijah Wood across Peter Jackson's trilogy. His journey to Mount Doom is one of cinema's great epics."
  },
  GROOT: {
    category: "Character",
    display: "Groot — Guardians of the Galaxy",
    description: "The gentle tree-creature who only says \"I am Groot.\" Voiced by Vin Diesel. Baby Groot became one of the MCU's most beloved characters almost instantly."
  },
  SIMBA: {
    category: "Character",
    display: "Simba — The Lion King",
    description: "The young lion prince who flees after his father Mufasa's death, only to return and reclaim his kingdom. Disney's 1994 classic is essentially Hamlet with lions."
  },
  VADER: {
    category: "Character",
    display: "Darth Vader — Star Wars",
    description: "One of cinema's greatest villains. The former Jedi Knight Anakin Skywalker, now servant of the Emperor. That breathing. That voice. That reveal."
  },
  DOBBY: {
    category: "Character",
    display: "Dobby — Harry Potter",
    description: "The free house-elf who fiercely loves Harry Potter. Appeared in Chamber of Secrets and Deathly Hallows. Dobby is a free elf — and he will never not make you cry."
  },

  // ── Film Crew / Craft ──
  AUDIO: {
    category: "Craft",
    display: "Audio",
    description: "The sound department responsible for capturing dialogue, ambient noise, and effects on set. Without great audio, even the best visuals fall apart."
  },
  BOOMS: {
    category: "Craft",
    display: "Boom Mic",
    description: "The long pole microphone held just out of frame to capture clean dialogue on set. Boom operators are the unsung heroes of production sound."
  },
  CRANE: {
    category: "Craft",
    display: "Camera Crane",
    description: "A mechanical arm that lifts the camera high above the set for sweeping overhead shots. Used to create dramatic reveals and grand cinematic scale."
  },
  DOLLY: {
    category: "Craft",
    display: "Dolly Shot",
    description: "A camera mounted on a wheeled cart that moves smoothly along a track. Creates fluid, gliding movement. The dolly zoom — or Vertigo effect — is one of cinema's most iconic techniques."
  },
  FRAME: {
    category: "Craft",
    display: "Frame",
    description: "A single still image in a film strip. Cinema runs at 24 frames per second. Every composition choice a director makes lives within the frame."
  },
  PROPS: {
    category: "Craft",
    display: "Props",
    description: "Any object handled by actors on screen. The prop department sources, builds, and maintains everything from background dressing to hero objects central to the story."
  },
  REELS: {
    category: "Craft",
    display: "Film Reels",
    description: "The physical spools of celluloid that film was shot and projected on. A standard 35mm reel holds about 10 minutes of footage. Digital projection has made them largely obsolete."
  },
  SCENE: {
    category: "Craft",
    display: "Scene",
    description: "A single continuous unit of action in a film, typically set in one location and time. Scripts are broken into scenes, and productions are scheduled scene by scene."
  },
  SCORE: {
    category: "Craft",
    display: "Film Score",
    description: "The original music composed specifically for a film. From Bernard Herrmann to John Williams to Ennio Morricone — a great score can make a film immortal."
  },
  SOUND: {
    category: "Craft",
    display: "Sound Design",
    description: "The art of creating the entire sonic world of a film. Every footstep, rainstorm, and explosion you hear in a movie has been carefully crafted by a sound designer."
  },
  STAGE: {
    category: "Craft",
    display: "Sound Stage",
    description: "A large indoor studio space where sets are built and filmed under controlled conditions. Hollywood's golden age was built inside sound stages."
  },

  // ── Genres & Industry ──
  ANIME: {
    category: "Genre",
    display: "Anime",
    description: "Japanese animated film and television. From Studio Ghibli's Spirited Away to Satoshi Kon's Perfect Blue — anime has produced some of cinema's most visually inventive work."
  },
  CRIME: {
    category: "Genre",
    display: "Crime",
    description: "One of cinema's most enduring genres. From The Godfather to Goodfellas to Parasite — crime films explore power, morality, and consequence like no other genre."
  },
  DRAMA: {
    category: "Genre",
    display: "Drama",
    description: "The broadest and oldest genre in film. Character-driven stories exploring human emotion, conflict, and consequence. The backbone of awards season every year."
  },
  INDIE: {
    category: "Genre",
    display: "Indie Film",
    description: "Films made outside the major studio system, typically with smaller budgets and more creative freedom. Sundance, A24, and the 90s indie boom changed what cinema could be."
  },
  PIXAR: {
    category: "Studio",
    display: "Pixar Animation Studios",
    description: "The studio behind Toy Story, Up, WALL-E, Inside Out, and more. Pixar pioneered computer-animated feature films and set the standard for emotionally intelligent storytelling in animation."
  },

  // ── Actors ──
  DAFOE: {
    category: "Actor",
    display: "Willem Dafoe",
    description: "One of cinema's most versatile character actors. Oscar-nominated for Platoon, Shadow of the Vampire, Florida Project, and At Eternity's Gate. Also the Green Goblin."
  },
  PESCI: {
    category: "Actor",
    display: "Joe Pesci",
    description: "Oscar winner for Goodfellas. Known for explosive, unpredictable performances in Raging Bull, Casino, and the Lethal Weapon series. Came out of retirement for The Irishman."
  },
  KEANU: {
    category: "Actor",
    display: "Keanu Reeves",
    description: "Star of The Matrix trilogy, John Wick, Speed, and Point Break. One of Hollywood's most beloved figures — both for his acting range and his famously kind reputation off screen."
  },
};