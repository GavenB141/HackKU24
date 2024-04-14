// import { faker } from "@faker-js/faker";
//
//
// export function random3CharBackronym(from: string) {
//     let out = ""
//     let chars = from.split('');
//
//     let categories = ["adverb", "adjective", "noun"];
//
//     for(let i = 0; i < 3; i++) {
//         let word = undefined;
//
//         while (word === undefined) {
//             let options = (<string[]>faker.definitions.word[categories[i]]).filter(
//                 (w) => w.startsWith(chars[i].toLowerCase()) || w.startsWith(chars[i].toUpperCase())
//             );
//
//             if(options.length === 0)
//                 word = chars[i]
//             else
//                 word = options[Math.floor(Math.random() * options.length)];
//         }
//
//         out += word.replace(word.charAt(0), word.charAt(0)?.toUpperCase());
//     }
//
//     return out;
// }
