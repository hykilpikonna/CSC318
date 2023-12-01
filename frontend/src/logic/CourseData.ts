

export interface Chapter
{
  name: string;
  steps: Step[];
}

export interface Step
{
  questions: Question[];
}

export interface Question
{
  question: string;
  wordBank?: string[];
  expected?: string;
  type: string;
  pronunciation?: string;
  description?: string;
  example?: string;
  translation?: string;
  clipUrl?: string;
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
          question: 'Transcribe this sentence',
          wordBank: ['刺身', 'ケーキ', 'の', 'は', 'おいしい', 'おもい', 'すし', '中', 'です'],
          expected: 'ケーキはおいしいです',
          translation: 'Cake is delicious',
          type: 'verbal-question',
        },
        {
          question: 'すしおたくさんあります',
          translation: 'There is a lot of sushi',
          type: 'verbal-pronunciation',
        },
        {
          question: 'What food does Yui like?',
          clipUrl: "https://fdjsakfjs.com",
          expected: 'ケーキ',
          type: 'video',
        }
      ]
    },
    {
      questions: [
        {
          question: 'Translate this sentence: 水をください',
          wordBank: ['I', 'sushi', 'water', 'want', 'please', 'give', 'rice', 'some', 'yesterday'],
          expected: 'Water please / I want water',
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
          question: 'Transcribe this sentence',
          wordBank: ['刺身', '水', 'は', 'おいしい', 'おもい', 'すし', '中', 'です'],
          expected: '水です',
          translation: 'It is water',
          type: 'verbal-question',
        },
        {
          question: '刺身おください',
          translation: 'Please give me sashimi',
          type: 'verbal-pronunciation',
        },
        {
          question: 'What is the following song about?',
          clipUrl: "https://www.youtube.com/watch?v=qfgyKPQO9g8",
          description: "This is the song 'Dango Daikazoku' from the anime 'Clannad'. It is about a family of dango.",
          expected: '団子',
          type: 'video',
        }
      ]
    }]
  }
]
