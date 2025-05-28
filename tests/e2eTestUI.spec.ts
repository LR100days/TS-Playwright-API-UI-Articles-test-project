import { test } from '../utils/fixtures';
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
    await onArticlesListPage.clickCreateNewArticleButton()
    await onArticleDetailsPage.enterNewArticleTitle(articleDetailsData.articleTitle)
    await onArticleDetailsPage.enterNewArticleDescription(articleDetailsData.articleDescription)
    await onArticleDetailsPage.enterNewArticleText(articleDetailsData.articleText)
    await onArticleDetailsPage.clickPublishArticleButton()

    await onArticleDetailsPage.verifyArticleTitleIs(articleDetailsData.articleTitle)
    await onArticleDetailsPage.verifyArticleTextIs(articleDetailsData.articleText)
    //TBD: verify tags here
    // await onArticleDetailsPage.verifyArticleTagsAre()

    await onArticleDetailsPage.navigateToArticlesListPage()
    await onArticlesListPage.verifyFirstArticleInTheListHasTitle(articleDetailsData.articleTitle)
    await onArticlesListPage.verifyFirstArticleInTheListHasDescription(articleDetailsData.articleDescription)

    //TBD: verify tags here
    //await onArticlesListPage.verifyFirstArticleTagsAre()


    // Edit article from UI
    await onArticlesListPage.selectTheFirstArticleInTheList()
    await onArticleDetailsPage.verifyArticleTitleIs(articleDetailsData.articleTitle)

    await onArticleDetailsPage.clickEditArticleButton()
    await onArticleDetailsPage.enterNewArticleTitle(articleDetailsData.changedArticleTitle)
    await onArticleDetailsPage.enterNewArticleDescription(articleDetailsData.changedArticleDescription)
    await onArticleDetailsPage.enterNewArticleText(articleDetailsData.changedArticleText)
    await onArticleDetailsPage.clickPublishArticleButton()

    await onArticleDetailsPage.verifyArticleTitleIs(articleDetailsData.changedArticleTitle)
    await onArticleDetailsPage.verifyArticleTextIs(articleDetailsData.changedArticleText)
    //TBD: verify tags here
    // await onArticleDetailsPage.verifyArticleTagsAre()

    await onArticleDetailsPage.navigateToArticlesListPage()
    await onArticlesListPage.verifyFirstArticleInTheListHasTitle(articleDetailsData.changedArticleTitle)
    await onArticlesListPage.verifyFirstArticleInTheListHasDescription(articleDetailsData.changedArticleDescription)
    
    //TBD: verify tags here
    //await onArticlesListPage.verifyFirstArticleTagsAre()

    // Delete created article from UI
    await onArticleDetailsPage.deleteArticleByTitle(articleDetailsData.changedArticleTitle)
    await onArticlesListPage.verifyThatArticleIsNotInTheListByTitle(articleDetailsData.changedArticleTitle)

})