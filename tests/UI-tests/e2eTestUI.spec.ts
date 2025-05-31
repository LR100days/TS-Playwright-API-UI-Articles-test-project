import { test } from '../../utils/fixtures';
import { config } from '../../api-test.config';
import { ArticlesListPage } from '../../page_objects/articlesListPage';
import { ArticleDetailsPage } from '../../page_objects/articleDetailsPage';
import { articleDetailsData } from '../../test_data/articleDetailsData';
import { LoginPage } from '../../page_objects/loginPage';


test('e2e UI test @UIe2e', async ({page}) => {
    const onArticlesListPage = new ArticlesListPage(page)
    const onArticleDetailsPage = new ArticleDetailsPage(page)
    const onLoginPage = new LoginPage(page)

    //Login
    await onLoginPage.loginWithValidCredentials(config.userEmail, config.userPassword)
    await onArticlesListPage.verifyThatHomePageIsShown()

    // Create article from UI
    await onArticlesListPage.clickCreateNewArticleButton()
    await onArticleDetailsPage.enterNewArticleTitle(articleDetailsData.articleTitle)
    await onArticleDetailsPage.enterNewArticleDescription(articleDetailsData.articleDescription)
    await onArticleDetailsPage.enterNewArticleText(articleDetailsData.articleText)
    await onArticleDetailsPage.enterNewArticleTags(articleDetailsData.articleTags)
    await onArticleDetailsPage.clickPublishArticleButton()

    await onArticleDetailsPage.verifyArticleTitleIs(articleDetailsData.articleTitle)
    await onArticleDetailsPage.verifyArticleTextIs(articleDetailsData.articleText)
    await onArticleDetailsPage.verifyArticleTagsAre(articleDetailsData.articleTags)
    
    await onArticleDetailsPage.navigateToArticlesListPage()
    await onArticlesListPage.verifyFirstArticleInTheListHasTitle(articleDetailsData.articleTitle)
    await onArticlesListPage.verifyFirstArticleInTheListHasDescription(articleDetailsData.articleDescription)
    await onArticlesListPage.verifyTagsForArticleAre(articleDetailsData.articleTags, articleDetailsData.articleTitle)
    
    // Edit article from UI
    await onArticlesListPage.selectTheFirstArticleInTheList()
    await onArticleDetailsPage.verifyArticleTitleIs(articleDetailsData.articleTitle)

    await onArticleDetailsPage.clickEditArticleButton()
    await onArticleDetailsPage.enterNewArticleTitle(articleDetailsData.changedArticleTitle)
    await onArticleDetailsPage.enterNewArticleDescription(articleDetailsData.changedArticleDescription)
    await onArticleDetailsPage.enterNewArticleText(articleDetailsData.changedArticleText)
    await onArticleDetailsPage.enterNewArticleTags(articleDetailsData.changedArticleTags)
    await onArticleDetailsPage.clickPublishArticleButton()

    await onArticleDetailsPage.verifyArticleTitleIs(articleDetailsData.changedArticleTitle)
    await onArticleDetailsPage.verifyArticleTextIs(articleDetailsData.changedArticleText)
    await onArticleDetailsPage.verifyArticleTagsAre(articleDetailsData.changedArticleTags)

    await onArticleDetailsPage.navigateToArticlesListPage()
    await onArticlesListPage.verifyFirstArticleInTheListHasTitle(articleDetailsData.changedArticleTitle)
    await onArticlesListPage.verifyFirstArticleInTheListHasDescription(articleDetailsData.changedArticleDescription)
    await onArticlesListPage.verifyTagsForArticleAre(articleDetailsData.changedArticleTags, articleDetailsData.changedArticleTitle)

    // Delete created article from UI
    await onArticleDetailsPage.deleteArticleByTitle(articleDetailsData.changedArticleTitle)
    await onArticlesListPage.verifyThatArticleIsNotInTheListByTitle(articleDetailsData.changedArticleTitle)

    await page.close()

})