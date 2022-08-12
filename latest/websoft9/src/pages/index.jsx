import * as React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { normalizedData } from "@utils";
import Seo from "@components/seo";
import Layout from "@layout";
import Header from "@layout/header/layout-01";
import Footer from "@layout/footer/layout-01";
import HeroArea from "@containers/hero/layout-02";
import HeroArea3 from "@containers/hero/layout-03";
import PartnerArea from "@containers/partner/layout-01";
import ContactArea from "@containers/contact/layout-01";
import ITServicesArea from "@containers/it-service/layout-02";
import TabArea from "@containers/tab/layout-01";
import TabArea2 from "@containers/tab/layout-02";
import CounterArea from "@containers/elements/counters/section-01";
import {SectionWrap} from "@styled"
import Heading from "@ui/heading";
import SolutionArea from "@containers/elements/box-large-image/section-02";
import {Trans, useTranslation,Link, useI18next} from 'gatsby-plugin-react-i18next';

const IndexPage = ({ location, data }) => {
    const {language, languages, changeLanguage } = useI18next();

    return (
        <Layout location={location}>
            <Seo title="Home" />
            <Header data={{ menu:data.allContentfulMenu.nodes, }} />

            <main className="site-wrapper-reveal">
                <HeroArea data={data.allContentfulPage.nodes[0].content[0]} />

                <TabArea data={data.allContentfulPage.nodes[0].content[1]}>
                    {
                        data.allContentfulPage.nodes[0].content[1].features.map((item)=>{
                            return(
                                <HeroArea3 key={item.id} data={ item }/>
                            )
                        })
                    }
                </TabArea>

                <SolutionArea data ={ data.allContentfulPage.nodes[0].content[2] } />

                
                <PartnerArea data={ data.allContentfulPage.nodes[0].content[3] } />  

                <ITServicesArea data={ data.allContentfulPage.nodes[0].content[4] }/>

                <TabArea2 data={ data.allContentfulPage.nodes[0].content[5] } />

                <CounterArea data={data.allContentfulPage.nodes[0].content[6]} />
                              
                {/* <ContactArea data={content["contact-section"]} /> */}
            </main>
            {/* <Footer data={{ ...data.site.siteMetadata }} /> */}
        </Layout>
    );
};

export const query = graphql`
    query IndexPageQuery($language: String!) {
        #多语言
        locales: allLocale(filter: {language: {eq: $language}}) {
            edges {
                node {
                    ns
                    data
                    language
                }
            }
        }
        # 查询菜单项
        allContentfulMenu(
            filter: {node_locale: {eq: $language}, isTop: {eq: true}}
            sort: {fields: title}
        ) {
            nodes {
            id: menuName
            text: title
            megamenu: submenu {
                title
                submenu {
                id: menuName
                text: title
                }
            }
            }
        }
        # 查询页面：index(首页)
        allContentfulPage(filter: {node_locale: {eq: $language}, key: {eq: "index"}}) {
            nodes {
            content {
                headings: title
                texts: subTitle
                media
                buttons {
                    id
                    content: key
                    path: value
                }
                features {
                ... on ContentfulBaseFeature {
                    id
                    title
                    subtitle
                    icon
                    image
                    description {
                        description
                    }
                }
                ... on ContentfulBaseBrand {
                    id
                    path: siteurl
                    logo {
                    src: imageurl
                    }
                }
                ... on ContentfulResource {
                    type {
                        title
                    }
                    id
                    title
                    subTitle
                    image:featureImage
                    slug            
                }
                }
            }
            }
        }
        # allContentfulBaseBrand(
        #     filter: {key: {in: ["alibabacloud", "aws", "tencentcloud", "huaweicloud", "azure"]}, node_locale: {eq: $language}}
        #     ) {
        #     nodes {
        #             id:key
        #             image:logo {
        #                 src:imageurl
        #             }
        #             path:storeurl
        #         }
        # }
    }
`;

IndexPage.propTypes = {
    location: PropTypes.shape({}),
    data: PropTypes.shape({
        
    }),
};

export default IndexPage;
