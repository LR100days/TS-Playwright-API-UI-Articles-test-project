import { test } from '../utils/fixtures';
import { expect } from '@playwright/test'
import { config } from '../api-test.config';
import { ArticlesListPage } from '../page_objects/articlesListPage';
import { ArticleDetailsPage } from '../page_objects/articleDetailsPage';
import { articleDetailsData } from '../test_data/articleDetailsData';

   
test.beforeEach(async({page}) => {
    await page.goto(`${config.baseURL}`);
    
})

test('e2e UI test @UIe2e', async ({page}) => {
    const onArticlesListPage = new ArticlesListPage(page)
    const onArticleDetailsPage = new ArticleDetailsPage(page)

    // Create article from UI
    await onArticlesListPage.createArticle(
        articleDetailsData.articleTitle,
        articleDetailsData.articleDescription,
        articleDetailsData.articleText, 
        articleDetailsData.articleTags)
    await onArticleDetailsPage.verifyArticleTitleIs(articleDetailsData.articleTitle)

    await onArticleDetailsPage.navigateToArticlesListPage()
    await onArticlesListPage.verifyArticleIsShownInTheListByTitle(articleDetailsData.articleTitle)

    // Edit article from UI
    await onArticlesListPage.selectTheFirstArticleInTheListBy(`${articleDetailsData.articleTitle} ${articleDetailsData.articleDescription} Read more...`)
    await onArticleDetailsPage.editArticleTo(articleDetailsData.changedArticleTitle, articleDetailsData.changedArticleDescription, articleDetailsData.changedArticleText)
    await onArticleDetailsPage.verifyArticleTitleIs(articleDetailsData.changedArticleTitle)

    await onArticleDetailsPage.navigateToArticlesListPage()
    await onArticlesListPage.verifyArticleIsShownInTheListByTitle(articleDetailsData.changedArticleTitle)

    // Delete created article from UI
    await onArticleDetailsPage.deleteArticleByTitle(articleDetailsData.changedArticleTitle)
    await onArticlesListPage.verifyThatArticleIsNotInTheListByTitle(articleDetailsData.changedArticleTitle)

})

test('delete article @UI', async ({page, request}) => {
    const response = await request.post(`${config.apiURL}/users/login`, {
        data: {
            "user":{"email":`${config.userEmail}`,"password":`${config.userPassword}`}
        }
    })
    const responseBody = await response.json()
    const accessToken = responseBody.user.token

    // Create article by API as a precondition to this test
    const articleResponseCreate = await request.post(`${config.apiURL}/articles/`, {
        data: {
            "article":{"title":"test delete article","description":"article is about...","body":"article text",}
        },
        headers: {
            Authorization: `Token ${accessToken}`
        }
    })
    
    // Verify that article is created by API as a precondition to this test
    expect(articleResponseCreate.status()).toEqual(201);
    await page.waitForURL(`${config.baseURL}`) // displays main list of articles
    await page.reload() // to get the created article by API in the UI
    
    // Delete created article from UI
    await page.getByRole('link', { name: 'test delete article' }).click();
    await page.getByRole('button', { name: 'Delete Article' }).first().click();
    await page.getByRole('link', { name: 'conduit' }).first().click();
    
    // Verifies that article is deleted and is not shown in the list
    await expect (page.getByRole('link', { name: 'test title1' })).toBeHidden();

})

test('edit article @UI', async ({ page, request }) => {
    const response = await request.post(`${config.apiURL}/users/login`, {
        data: {
            "user":{"email":`${config.userEmail}`,"password":`${config.userPassword}`}
        }
    })
    const responseBody = await response.json()
    const accessToken = responseBody.user.token

    // Create article by API as a precondition to this test
    const articleResponseCreate = await request.post(`${config.apiURL}/articles/`, {
        data: {
            "article":{"title":"test edit article","description":"article is about...","body":"article text",}
        },
        headers: {
            Authorization: `Token ${accessToken}`
        }
    })
    
    // Verify that article is created by API as a precondition to this test
    expect(articleResponseCreate.status()).toEqual(201);


    await page.waitForURL(`${config.baseURL}`) // displays main list of articles
    await page.reload() // to get the created article by API in the UI
   
    await page.getByRole('link', { name: 'test edit article article is about... Read more...' }).click();

    // Edit article
    await page.getByRole('link', { name: ' Edit Article' }).first().click();
    await page.getByPlaceholder('What\'s this article about?').click();
    await page.getByPlaceholder('What\'s this article about?').clear();
    await page.getByPlaceholder('What\'s this article about?').fill('text edited');
    await page.getByPlaceholder('Write your article (in').click();
    await page.getByPlaceholder('Write your article (in').clear();
    await page.getByPlaceholder('Write your article (in').fill('text edited');
    await page.getByPlaceholder('Article Title').click();
    await page.getByPlaceholder('Article Title').clear();
    await page.getByPlaceholder('Article Title').fill("Edited title");
    await page.getByRole('button', { name: 'Publish Article' }).click();

    // Verifies that article is edited and shown on the article details page
    await page.waitForSelector('h1');
    await expect (page.getByRole('heading')).toHaveText("Edited title");

    await page.getByRole('navigation').getByRole('link', { name: 'conduit' }).click();

    //Extracts unique article ID for further test data clean up
    const editedArticleResponse = await page.waitForResponse(`${config.apiURL}/articles?limit=10&offset=0`)
    const editedArticleResponseBody = await editedArticleResponse.json();
    const slugID = editedArticleResponseBody.articles[0].slug;
    
    // Verifies that edited article is shown in the list
    await expect (page.getByRole('link', { name: 'Edited title' })).toBeVisible();

    //Clean up created test data
    
    const deleteArticleResponse = await request.delete(`${config.apiURL}/articles/${slugID}`, {
        headers: {
            Authorization: `Token ${accessToken}`
        }
    });
    expect(deleteArticleResponse.status()).toEqual(204);

  });

test('create article @UI', async ({page, request}) => {
    // Create new article
    await page.getByRole('link', { name: 'New Article' }).click();
    await page.getByPlaceholder('Article Title').fill('test title');
    await page.getByPlaceholder('What\'s this article about?').fill('article is about...');
    await page.getByPlaceholder('Write your article (in').fill('article text');
    await page.getByPlaceholder('Enter tags').fill('some added tag');
    await page.getByRole('button', { name: 'Publish Article' }).click();

    //Extract unique article ID while article creation
    const articleResponse = await page.waitForResponse(`${config.apiURL}/articles/`)
    const articleResponseBody = await articleResponse.json();
    const slugID = articleResponseBody.article.slug;

    // Verify that the new article is created
    await expect(page.getByRole('heading')).toHaveText('test title');

    // Navigate to the articles list and verifies that new article is present in the list
    await page.getByRole('link', { name: 'conduit' }).first().click();
    await expect (page.getByRole('link', { name: 'test title article is about...' })).toBeVisible();

    //Clean up created test data
    const response = await request.post(`${config.apiURL}/users/login`, {
        data: {
            "user":{"email":`${config.userEmail}`,"password":`${config.userPassword}`}
        }
    })
    const responseBody = await response.json()
    const accessToken = responseBody.user.token
    const deleteArticleResponse = await request.delete(`${config.apiURL}/articles/${slugID}`, {
        headers: {
            Authorization: `Token ${accessToken}`
        }
    });
    expect(deleteArticleResponse.status()).toEqual(204);

   });


