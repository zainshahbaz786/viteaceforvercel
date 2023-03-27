import { LensOutlined } from '@material-ui/icons'
import _ from 'lodash'

const stopWords = [
    'i',
    'hello',
    'me',
    'my',
    'we',
    'our',
    'ours',
    'you',
    'your',
    'yours',
    'he',
    'him',
    'his',
    'she',
    'her',
    'hers',
    'it',
    'its',
    'they',
    'them',
    'their',
    'theirs',
    'what',
    'which',
    'who',
    'whom',
    'this',
    'that',
    'these',
    'those',
    'am',
    'is',
    'are',
    'was',
    'were',
    'be',
    'been',
    'being',
    'have',
    'has',
    'had',
    'having',
    'do',
    'does',
    'did',
    'doing',
    'a',
    'an',
    'the',
    'and',
    'but',
    'if',
    'or',
    'because',
    'as',
    'until',
    'while',
    'of',
    'at',
    'by',
    'for',
    'with',
    'about',
    'against',
    'between',
    'into',
    'through',
    'during',
    'before',
    'after',
    'above',
    'below',
    'to',
    'from',
    'up',
    'down',
    'in',
    'out',
    'on',
    'off',
    'over',
    'under',
    'again',
    'further',
    'then',
    'once',
    'here',
    'there',
    'when',
    'where',
    'why',
    'how',
    'all',
    'any',
    'both',
    'each',
    'few',
    'more',
    'most',
    'other',
    'some',
    'such',
    'no',
    'nor',
    'not',
    'only',
    'own',
    'same',
    'so',
    'than',
    'too',
    'very',
    's',
    't',
    'can',
    'will',
    'just',
    'don',
    'should',
    'now',
]

const remove_stopwords = (str = '') => {
    const words = str && str?.toLowerCase().split(' ')
    return _.filter(words, (word) => !stopWords.includes(word))
}

export function solveKeyWords(speech, keywords) {
    // const _keywords = ObjectToArray(keywords)
    let _keywords = keywords;
    const words = remove_stopwords(speech)
    const _results = []
    words && _.forEach(_keywords, (keyword) => {
        const found = _.every(remove_stopwords(keyword.keywordText), (find) => {
            return words.includes(find)
        })
        found && _results.push({ ...keyword, marked: true })
        if (found) {
            keyword.marked = true;
        }
    })
    // return ArrayToObject(_results)
    return _keywords;
}

function ObjectToArray(obj) {
    let arrays = []
    _.toPairs(obj).forEach((element) => {
        element[1].marked !== true &&
            arrays.push({ key: element[0], ...element[1] })
    })
    return arrays
}

function ArrayToObject(obj) {
    return obj.map((i) => {
        return { [i.key]: { ...i } }
    })
}
