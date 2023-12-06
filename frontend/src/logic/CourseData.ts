export interface Chapter
{
  name: string
  steps: Step[]
}

export interface Step
{
  questions: Question[]
}

export interface _Question
{
  question: string
  type: string
}
export type Question = WrittenQuestion | VocabularyQuestion | VerbalQuestion | VerbalPronunciation | VideoQuestion

export interface WrittenQuestion extends _Question
{
  wordBank: string[]
  expected: string
  type: 'written-question'
}

export interface VocabularyQuestion extends _Question
{
  pronunciation: string
  description: string
  example: string
  type: 'written-vocabulary'
}

export interface VerbalQuestion extends _Question
{
  wordBank: string[]
  expected: string
  translation: string
  url: string
  type: 'verbal-question'
}

export interface VerbalPronunciation extends _Question
{
  translation: string
  type: 'verbal-pronunciation'
}

export interface VideoQuestion extends _Question
{
  clipUrl: string
  description: string
  expected: string
  type: 'video'
}

export const chapters_jp: Chapter[] = [
  {
    name: 'Order food',
    steps: [{
      questions: [
        {
          question: 'Translate this sentence: すしをください',
          wordBank: ['I', 'sushi', 'cookies', 'want', 'please', 'give', 'rice', 'some', 'yesterday'],
          expected: 'Sushi please / I want sushi',
          type: "written-question"
        },
        {
          question: '刺身',
          pronunciation: 'さしみ (sashimi)',
          description: 'Sashimi is a Japanese delicacy consisting of fresh raw fish or meat sliced into thin pieces and often eaten with soy sauce.',
          example: '刺身を好きです。 (I like sashimi)',
          type: 'written-vocabulary',
        },
        {
          question: 'What do you hear?',
          wordBank: ['刺身', 'ケーキ', 'の', 'は', 'おいしい', 'おもい', 'すし', '中', 'です'],
          expected: 'ケーキはおいしいです',
          translation: 'Cake is delicious',
          url: window.location.origin + '/audio/jp_1_1_3.mp3',
          type: 'verbal-question',
        },
        {
          question: 'すしをたくさんあります',
          translation: 'There is a lot of sushi',
          type: 'verbal-pronunciation',
        },
        {
          question: 'What is the following song about?',
          clipUrl: window.location.origin + "/video/dango.mp4",
          description: "This is the song 'Dango Daikazoku' from the anime 'Clannad'. It is about a family of dango.",
          expected: '団子 or dango',
          type: 'video',
        }
      ]
    },
      {
        questions: [
          {
            // question: "Translate this sentence: Water please",
            // wordBank: ['水', 'を', 'ください', 'おいしい', 'おもい', 'すし', '中', 'です'],
            question: 'Translate this sentence: 水をください',
            wordBank: ['I', 'sushi', 'cookies', 'want', 'please', 'give', 'rice', 'some', 'yesterday'],
            // expected: '水をください',
            expected: 'Water please',
            type: "written-question"
          },
          {
            question: '団子',
            pronunciation: 'だんご (dango)',
            description: 'Dango is a kind of mochi, Japanese dumpling and sweet made from mochiko (rice flour).',
            example: '大きいな団子です。(It is a big dango)',
            type: 'written-vocabulary',
          },
          {
            question: 'What do you hear?',
            wordBank: ['刺身', '水', 'は', 'おいしい', 'おもい', 'すし', '中', 'です'],
            expected: '水です',
            translation: 'It is water',
            url: window.location.origin + '/audio/jp_1_2_3.mp3',
            type: 'verbal-question',
          },
          {
            question: '刺身おください',
            translation: 'Please give me sashimi',
            type: 'verbal-pronunciation',
          },
          {
            question: 'What did Yui come to the club meeting for?',
            clipUrl: window.location.origin + "/video/cake.mp4",
            description: "This is a clip from the anime 'K-On'. Yui is a member of the light music club. She came to the club meeting to eat cake.",
            expected: 'ケーキ or cake',
            type: 'video',
          },
        ]
      }]
  }
]
