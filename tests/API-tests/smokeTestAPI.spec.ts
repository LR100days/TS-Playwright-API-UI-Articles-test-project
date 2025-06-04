import { test } from '../../utils/fixtures';
import { expect } from '../../utils/custom-expect'
import articleRequestPayload from '../../requests-objects/POST-article.json'
import { articleDetailsData } from '../../test_data/articleDetailsDataGenerator';


test('Get Articles', async({ api }) => {
    const response = await api
        .path('/articles')
        .params({limit:10, offset:0})
        .getRequest(200)
    await expect(response).shouldMatchSchema('articles', 'GET_articles')
    expect(response.articles.length).toBeLessThanOrEqual(10)
    expect(response.articlesCount).shouldEqual(10)
    
})

test('Get Test Tags', async({ api }) => {
    const response = await api
        .path('/tags')
        .getRequest(200)
    await expect(response).shouldMatchSchema('tags', 'GET_tags')
    expect(response.tags[0]).shouldEqual('Test')
    expect(response.tags.length).shouldBeLessThanOrEqual(10)
    
})

test('Create and delete Article', async({ api }) => {
    const initialArticleTitle = articleDetailsData.articleTitle
    articleRequestPayload.article.title = initialArticleTitle
    const createArticleResponse = await api
        .path('/articles')
        .body(articleRequestPayload)
        .postRequest(201)

    await expect(createArticleResponse).shouldMatchSchema('articles', 'POST_article')
    expect(createArticleResponse.article.title).shouldEqual(initialArticleTitle)
    const slugId = createArticleResponse.article.slug

    const articlesResponse = await api
        .path('/articles')
        .params({limit:10, offset:0})
        .getRequest(200)
    expect(articlesResponse.articles[0].title).shouldEqual(initialArticleTitle)

    await api
        .path(`/articles/${slugId}`)
        .deleteRequest(204)

    const articlesResponseAfterDeletion = await api
        .path('/articles')
        .params({limit:10, offset:0})
        .getRequest(200)
    expect(articlesResponseAfterDeletion.articles[0].title).not.shouldEqual(initialArticleTitle)
})

test('Create, Update and Delete Article', async({ api }) => {
    const initialArticleTitle = articleDetailsData.articleTitle
    articleRequestPayload.article.title = initialArticleTitle
    
    const createArticleResponse = await api
        .path('/articles')
        .body(articleRequestPayload)
        .postRequest(201)
    
    expect(createArticleResponse.article.title).shouldEqual(initialArticleTitle)
    const slugId = createArticleResponse.article.slug

    const modifiedlArticleTitle = articleDetailsData.changedArticleTitle
    articleRequestPayload.article.title = modifiedlArticleTitle

    const updateArticleResponse = await api
        .path(`/articles/${slugId}`)
        .body(articleRequestPayload)

        .putRequest(200)

    expect(updateArticleResponse.article.title).shouldEqual(modifiedlArticleTitle)
    const newSlugId = updateArticleResponse.article.slug

    const articlesResponse = await api
        .path('/articles')
        .params({limit:10, offset:0})
        .getRequest(200)
    expect(articlesResponse.articles[0].title).shouldEqual(modifiedlArticleTitle)

    await api
        .path(`/articles/${newSlugId}`)
        .deleteRequest(204)

    const articlesResponseAfterDeletion = await api
        .path('/articles')
        .params({limit:10, offset:0})
        .getRequest(200)
    expect(articlesResponseAfterDeletion.articles[0].title).not.shouldEqual(modifiedlArticleTitle)
})