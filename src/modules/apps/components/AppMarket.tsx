import { FC } from "react";
import classes from "./AppMarket.module.css";
import { IconType } from "react-icons";
import clsx from "clsx";

export type AppMarketProps = {
  Icon: IconType;
  label: string;
  href?: string;
};

const AppMarket: FC<AppMarketProps> = ({ Icon, label, href }) => {
  return (
    <a className={clsx(classes.container, classes.link)} href={href}>
      <Icon size={24} className={classes.icon} />
      <p className={classes.label}> {label}</p>
    </a>
  );
};

export default AppMarket;
