let model;

export async function loadModel() {
  model = await use.loadQnA()
}

export async function compareWord(word1, word2) {
  const input = {
    queries: [word1],
    responses: [word2]
  };
  const embeddings = model.embed(input);
  const scores = await tf.matMul(embeddings['queryEmbedding'], embeddings['responseEmbedding'], false, true).data()
  const score = scores[0]
  embeddings['queryEmbedding'].dispose();
  embeddings['responseEmbedding'].dispose();
  return score;
}