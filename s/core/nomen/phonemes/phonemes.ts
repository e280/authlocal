
import {Phonemes} from "./utils.js"

// inspired by urbit's @p naming system

export const prefixes = new Phonemes([
	"nop", "bem", "bin", "bor", "buf", "cal", "cem", "cin", "cor", "cub", "dal", "dem", "din", "dor", "yol", "fal",
	"fen", "fir", "fol", "fum", "gal", "gem", "gin", "gor", "gul", "hal", "hem", "hin", "hor", "hul", "kal", "kem",
	"kin", "kor", "kul", "lam", "len", "lin", "lor", "lum", "mal", "men", "min", "mor", "mul", "nal", "nem", "nin",
	"nor", "nul", "pal", "pem", "pin", "por", "pul", "ral", "rem", "rin", "ror", "rum", "sal", "sem", "sin", "sor",
	"sun", "tal", "tem", "tin", "tor", "tul", "val", "vem", "vin", "vor", "vul", "wel", "wem", "win", "wor", "mel",
	"xel", "xin", "xor", "xul", "yal", "yen", "yin", "yor", "zul", "zan", "zen", "zin", "zor", "zun", "bac", "bed",
	"bod", "bun", "cad", "cog", "cus", "dab", "den", "dig", "dus", "fab", "fid", "fob", "gad", "gid", "gob", "hab",
	"hid", "hob", "jab", "jid", "job", "kab", "kid", "kob", "lab", "lid", "lob", "mab", "mid", "mob", "nab", "nid",
	"nob", "pab", "pid", "pob", "rab", "rid", "rob", "sab", "sid", "sob", "tab", "tid", "tob", "vab", "vid", "vob",
	"wab", "wid", "wob", "yab", "yid", "yob", "zab", "zid", "zob", "bar", "bel", "bol", "bur", "car", "cel", "col",
	"cur", "dar", "del", "dol", "dur", "far", "fel", "fur", "gar", "gel", "gol", "gur", "har", "hel", "hol", "bag",
	"bob", "jar", "jel", "jol", "jur", "kar", "kel", "kol", "kur", "lar", "lel", "lol", "lur", "mar", "bef", "mol",
	"mur", "nar", "nel", "nol", "nur", "par", "pel", "pol", "pur", "rar", "rel", "rol", "rur", "sar", "sel", "sol",
	"sur", "tar", "tel", "tol", "tur", "var", "vel", "vol", "vur", "war", "wol", "wur", "yar", "yel", "ded", "yur",
	"zar", "zel", "zol", "zur", "bam", "ban", "bat", "cam", "can", "cat", "dam", "dan", "dat", "fam", "fan", "ter",
	"ham", "han", "hat", "jam", "jan", "jat", "kam", "kan", "kat", "lan", "lat", "mam", "man", "mat", "wex", "wix",
])

export const suffixes = new Phonemes([
	"nop", "ryx", "rux", "rak", "ruk", "rad", "ren", "ryd", "zex", "zyx", "zok", "bob", "zud", "zen", "zyn", "xel",
	"xen", "xal", "xod", "xur", "kex", "ken", "kyn", "kor", "kur", "kad", "ker", "ked", "kaz", "kez", "lek", "lex",
	"lyx", "lur", "lan", "len", "lod", "lum", "myn", "myr", "mox", "mux", "mak", "med", "nek", "nyx", "nor", "nex",
	"nux", "nod", "nur", "pak", "pex", "pyr", "pyx", "rex", "sak", "syd", "syr", "tek", "tyx", "tux", "tor", "tur",
	"vek", "vex", "vyr", "vox", "wex", "wyn", "wyr", "wux", "nyl", "yex", "yod", "yux", "zor", "zyl", "wok", "bex",
	"bry", "bur", "car", "cex", "cry", "cur", "dar", "dex", "dyr", "dur", "far", "fex", "fyr", "fur", "gar", "gex",
	"gyr", "gur", "har", "hex", "het", "hur", "jox", "jex", "ray", "rey", "kar", "kyr", "lar", "lyr", "mar", "mex",
	"mur", "nar", "par", "pur", "rar", "raz", "roy", "sar", "sur", "tar", "tex", "tyr", "var", "vur", "war", "wur",
	"yar", "yer", "yur", "zar", "zop", "zur", "bak", "bok", "buk", "dak", "dek", "dok", "duk", "fek", "fok", "gak",
	"gek", "gok", "hak", "hek", "hok", "koy", "key", "kay", "kak", "kek", "kel", "lak", "lok", "mek", "mok", "nak",
	"nok", "pek", "pok", "rek", "rok", "sek", "sok", "tak", "tok", "vak", "vok", "wak", "wek", "yak", "yek", "yok",
	"vyk", "vyx", "wyk", "wyx", "mer", "yax", "mac", "bek", "bax", "hax", "dox", "fox", "fyx", "gyn", "gyx", "hon",
	"hop", "jan", "jeb", "kan", "kog", "lyk", "myk", "myx", "nyk", "pyk", "ryk", "syk", "syx", "tyk", "vod", "wyd",
	"dyd", "zan", "zer", "yen", "yew", "zyd", "byd", "byr", "dyb", "fyd", "gyd", "hen", "red", "lyd", "myd", "daz",
	"nyd", "pyd", "tyd", "vyn", "zek", "byn", "dyn", "fyn", "gen", "lyn", "nyn", "ryn", "syn", "tyn", "myl", "bef",
	"lyt", "wyz", "wuk", "kax", "sax", "xek", "wen", "ryt", "tyv", "xok", "ryz", "zad", "tyz", "vuz", "ron", "rez",
])

