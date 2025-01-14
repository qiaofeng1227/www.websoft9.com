import React from "react";
import PropTypes from "prop-types";
import { StaticImage } from "gatsby-plugin-image";
import { Container, Row, Col } from "@ui/wrapper";
import Anchor from "@ui/anchor";
import Button from "@ui/button";
import { HeadingType, TextType, ButtonType } from "@utils/types";
import {
    ConatactWrapper,
    ContactInfoBox,
    StyledHeading,
    StyledText,
    StyledInfoTitle,
    StyledBG,
} from "./style";
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next';

const ContactArea = ({ data }) => {
    const { t } = useTranslation();
    return (
        <ConatactWrapper>
            <StyledBG>
                <StaticImage
                    src="../../../assets/images/bg/contact-bg.jpg"
                    alt="Contact BG"
                />
            </StyledBG>
            <Container>
                <Row alignItems="center">
                    <Col lg={6}>
                        {data?.headings?.[0] && (
                            <StyledHeading
                                as={data.headings[0].level}
                                dangerouslySetInnerHTML={{
                                    __html: t(data.headings[0].content),
                                }}
                            />
                        )}
                        {data?.texts?.[0] && (
                            <StyledText
                                dangerouslySetInnerHTML={{
                                    __html: t(data.texts[0].content),
                                }}
                            />
                        )}
                    </Col>
                    <Col lg={6}>
                        <ContactInfoBox>
                            <i className="icon fal fa-phone"></i>
                            {data?.headings?.[1] && (
                                <StyledInfoTitle as={data.headings[1]?.level}>
                                    <Trans>{data.headings[1].content}</Trans>
                                </StyledInfoTitle>
                            )}

                            {data?.headings?.[2] && (
                                <h2>
                                    <Anchor
                                        path="/"
                                        color="#002fa6"
                                        hover={{ layout: 2, color: "#002fa6" }}
                                    >
                                        <Trans>{data.headings[2].content}</Trans>
                                    </Anchor>
                                </h2>
                            )}
                            {data?.buttons?.map(
                                ({ id, content, path, ...rest }) => (
                                    <Button
                                        key={id}
                                        path={path}
                                        mt="20px"
                                        minWidth="230px"
                                        {...rest}
                                    >
                                        <Trans>{content}</Trans>
                                    </Button>
                                )
                            )}
                        </ContactInfoBox>
                    </Col>
                </Row>
            </Container>
        </ConatactWrapper>
    );
};

ContactArea.propTypes = {
    data: PropTypes.shape({
        headings: PropTypes.arrayOf(PropTypes.shape(HeadingType)),
        texts: PropTypes.arrayOf(PropTypes.shape(TextType)),
        buttons: PropTypes.arrayOf(PropTypes.shape(ButtonType)),
    }),
};

export default ContactArea;
