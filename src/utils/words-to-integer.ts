export function WordstoSignedInteger(words: any, BitsPerWord: any) {
  let val = 0;
  const word_val = 2 ** BitsPerWord;
  for (let i = 0; i < words.length; i += 1) {
    val += words[i] * word_val ** i;
  }
  const bits = words.length * BitsPerWord;
  if (val > 2 ** (bits - 1)) {
    val = val - 2 ** bits;
  }
  return val;
}
