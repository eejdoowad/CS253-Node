'use strict';
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('mydb.sql');

db.serialize(function () {
  db.run('CREATE TABLE IF NOT EXISTS lorem (info TEXT)');

  let stmt = db.prepare('INSERT INTO lorem VALUES (?)');
  for (let i = 0; i < 10; i++) {
    stmt.run('Ipsum ' + i);
  }
  stmt.finalize();

  db.each('SELECT rowid AS id, info FROM lorem', function (err, row) {
    console.log(row.id + ': ' + row.info);
  });

  let links = [
    [0, 60398, 1334014208.0, 109,
      "C overtakes Java as the No. 1 programming language in the TIOBE index.",
      "http://pixelstech.net/article/index.php?id=1333969280"],
    [1, 60254, 1333962645.0, 891,
      "This explains why technical books are all ridiculously thick and overpriced",
      "http://prog21.dadgum.com/65.html"],
    [23, 62945, 1333894106.0, 351,
      "Learn Haskell Fast and Hard",
      "http://yannesposito.com/Scratch/en/blog/Haskell-the-Hard-Way/"],
    [2, 6084, 1333996166.0, 81,
      "Announcing Yesod 1.0- a robust, developer friendly, high performance web framework for Haskell",
      "http://www.yesodweb.com/blog/2012/04/announcing-yesod-1-0"],
    [3, 30305, 1333968061.0, 270,
      "TIL about the Lisp Curse",
      "http://www.winestockwebdesign.com/Essays/Lisp_Curse.html"],
    [4, 59008, 1334016506.0, 19,
      "The Downfall of Imperative Programming. Functional Programming and the Multicore Revolution",
      "http://fpcomplete.com/the-downfall-of-imperative-programming/"],
    [5, 8712, 1333993676.0, 26,
      "Open Source - Twitter Stock Market Game - ",
      "http://www.twitstreet.com/"],
    [6, 48626, 1333975127.0, 63,
      "First look: Qt 5 makes JavaScript a first-class citizen for app development",
      "http://arstechnica.com/business/news/2012/04/an-in-depth-look-at-qt-5-making-javascript-a-first-class-citizen-for-native-cross-platform-developme.ars"],
    [7, 30172, 1334017294.0, 5,
      "Benchmark of Dictionary Structures", "http://lh3lh3.users.sourceforge.net/udb.shtml"],
    [8, 678, 1334014446.0, 7,
      "If It's Not on Prod, It Doesn't Count: The Value of Frequent Releases",
      "http://bits.shutterstock.com/?p=165"],
    [9, 29168, 1334006443.0, 18,
      "Language proposal: dave",
      "http://davelang.github.com/"],
    [17, 48626, 1334020271.0, 1,
      "LispNYC and EmacsNYC meetup Tuesday Night: Large Scale Development with Elisp ",
      "http://www.meetup.com/LispNYC/events/47373722/"],
    [101, 62443, 1334018620.0, 4,
      "research!rsc: Zip Files All The Way Down",
      "http://research.swtch.com/zip"],
    [12, 10262, 1334018169.0, 5,
      "The Tyranny of the Diff",
      "http://michaelfeathers.typepad.com/michael_feathers_blog/2012/04/the-tyranny-of-the-diff.html"],
    [13, 20831, 1333996529.0, 14,
      "Understanding NIO.2 File Channels in Java 7",
      "http://java.dzone.com/articles/understanding-nio2-file"],
    [15, 62443, 1333900877.0, 1244,
      "Why vector icons don't work",
      "http://www.pushing-pixels.org/2011/11/04/about-those-vector-icons.html"],
    [14, 30650, 1334013659.0, 3,
      "Python - Getting Data Into Graphite - Code Examples",
      "http://coreygoldberg.blogspot.com/2012/04/python-getting-data-into-graphite-code.html"],
    [16, 15330, 1333985877.0, 9,
      "Mozilla: The Web as the Platform and The Kilimanjaro Event",
      "https://groups.google.com/forum/?fromgroups#!topic/mozilla.dev.planning/Y9v46wFeejA"],
    [18, 62443, 1333939389.0, 104,
      "github is making me feel stupid[er]",
      "http://www.serpentine.com/blog/2012/04/08/github-is-making-me-feel-stupider/"],
    [19, 6937, 1333949857.0, 39,
      "BitC Retrospective: The Issues with Type Classes",
      "http://www.bitc-lang.org/pipermail/bitc-dev/2012-April/003315.html"],
    [20, 51067, 1333974585.0, 14,
      "Object Oriented C: Class-like Structures",
      "http://cecilsunkure.blogspot.com/2012/04/object-oriented-c-class-like-structures.html"],
    [10, 23944, 1333943632.0, 188,
      "The LOVE game framework version 0.8.0 has been released - with GLSL shader support!",
      "https://love2d.org/forums/viewtopic.php?f=3&amp;t=8750"],
    [22, 39191, 1334005674.0, 11,
      "An open letter to language designers: Please kill your sacred cows. [megarant]",
      "http://joshondesign.com/2012/03/09/open-letter-language-designers"],
    [21, 3777, 1333996565.0, 2,
      "Developers guide to Garage48 hackatron",
      "http://martingryner.com/developers-guide-to-garage48-hackatron/"],
    [24, 48626, 1333934004.0, 17,
      "An R programmer looks at Julia",
      "http://www.r-bloggers.com/an-r-programmer-looks-at-julia/"]];

  db.run(
    'CREATE TABLE IF NOT EXISTS links' +
    '(id integer, submitter_id integer, submitted_time integer, ' +
    'votes integer, title text, url text)');
  links.forEach((entry) => {
    db.run('insert into links values (?, ?, ?, ?, ?, ?)', entry);
  });
});

db.close();
