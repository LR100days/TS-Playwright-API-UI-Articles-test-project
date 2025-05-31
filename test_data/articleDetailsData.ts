import { faker } from '@faker-js/faker'

export const articleDetailsData = {
    articleTitle: "Original article title here",
    articleDescription: "Original article description here",
    articleText: "Original article text here",
    articleTags: ['my tag1', 'my tag2', 'the last tag'],
    changedArticleTitle: faker.lorem.words({ min: 1, max: 5 }),
    changedArticleDescription: faker.lorem.text(),
    changedArticleText: faker.lorem.paragraph(),
    changedArticleTags: ['my tag1', 'my tag2', 'the last tag', 'added tag'],
}