import { useLocation } from "react-router-dom";
import {
    createStyles,
    Header,
    Container,
    Group,
    Burger,
    rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "react-router-dom";
import bear from "../assets/tutorme.svg"

const useStyles = createStyles((theme) => ({
    header: {
        display: "flex",
        justifyContent: "start",
        gap: "2rem",
        alignItems: "center",
        height: "100%",
    },
    links: {
        [theme.fn.smallerThan("xs")]: {
            display: "none",
        },
    },
    burger: {
        [theme.fn.largerThan("xs")]: {
            display: "none",
        },
    },
    link: {
        display: "block",
        lineHeight: 1,
        padding: `${rem(8)} ${rem(12)}`,
        borderRadius: theme.radius.sm,
        textDecoration: "none",
        color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,
        "&:hover": {
            // backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
            fontWeight: 700,
        },
    },
    linkActive: {
        "&, &:hover": {
            // backgroundColor: theme.fn.variant({
            //     variant: "light",
            //     color: theme.primaryColor,
            // }).background,
            // color: theme.fn.variant({
            //     variant: "light",
            //     color: theme.primaryColor,
            // }).color,
            fontWeight: 700,
        },
    },
}));

interface HeaderSimpleProps {
    links: { link: string; label: string }[];
}

export function HeaderSimple({ links }: HeaderSimpleProps) {
    const location = useLocation();
    const { classes, cx } = useStyles();
    const [opened, { toggle }] = useDisclosure(false);

    const items = links.map((link) => (
        <Link
            key={link.label}
            style={{ fontSize: "1.2rem" }}
            to={link.link}
            className={cx(classes.link, {
                [classes.linkActive]: location.pathname === link.link,
            })}
        >
            {link.label}
        </Link>
    ));

    return (
        <Header height={80} style={{ backgroundColor: "#F7EEE5" }}>
            <Container className={classes.header}>
                <img src={bear} style={{ height: '70%' }} />
                <Group spacing={5} className={classes.links}>
                    {items}
                </Group>
                <Burger
                    opened={opened}
                    onClick={toggle}
                    className={classes.burger}
                    size='sm'
                />
            </Container>
        </Header>
    );
}
