import { FC, useCallback, useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "react-router";
import { UAParser } from "ua-parser-js";
import { OS } from "ua-parser-js/enums";
import AppMarket from "./components/AppMarket";
import { FaAppStore } from "react-icons/fa";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import classes from "./Apps.module.css";

const AppsScreen: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const redirectTimeout = useRef<NodeJS.Timeout>(undefined);

  const appName = useMemo(() => {
    return searchParams.get("app_name");
  }, [searchParams]);

  const iosUrl = useMemo(() => {
    const appStoreId = searchParams.get("appstore_id");
    const _ipaUrl = searchParams.get("ipa_url");
    return (
      _ipaUrl ??
      (appStoreId ? `https://apps.apple.com/app/id${appStoreId}` : undefined)
    );
  }, [searchParams]);

  const aosUrl = useMemo(() => {
    const playStoreId = searchParams.get("playstore_id");
    const _apkUrl = searchParams.get("apk_url");
    return (
      _apkUrl ??
      (playStoreId
        ? `https://play.google.com/store/apps/details?id=${playStoreId}`
        : undefined)
    );
  }, [searchParams]);

  const redirectMs = useMemo(() => {
    return searchParams.get("redirect") ?? false;
  }, [searchParams]);

  const userOS = useMemo(() => {
    return new UAParser().getResult().os;
  }, []);

  useEffect(() => {
    if (redirectMs && Number(redirectMs) > 0) {
      const _searchParams = searchParams;
      _searchParams.delete("redirect");
      // setSearchParams(_searchParams);
      redirectTimeout.current = setTimeout(() => {
        let _href: string | undefined = undefined;
        if (userOS.is(OS.IOS) && iosUrl) {
          _href = iosUrl;
        } else if (userOS.is(OS.ANDROID) && aosUrl) {
          _href = aosUrl;
        }
        if (_href) {
          window.location.href = _href;
        }
      }, Number(redirectMs));
    }
    return () => {
      clearTimeout(redirectTimeout.current);
    };
  }, [aosUrl, iosUrl, redirectMs, searchParams, setSearchParams, userOS]);

  const onClickAppMarket = useCallback(
    (href: string) => () => {
      window.location.href = href;
    },
    []
  );

  return (
    <>
      <h3>{appName}</h3>
      {/* <p>{userOS.name}</p> */}
      {/* {iosUrl}
      {aosUrl} */}
      <div className={classes.container}>
        {iosUrl ? (
          <AppMarket
            Icon={FaAppStore}
            label="iOS"
            href={iosUrl}
          />
        ) : null}
        {aosUrl ? (
          <AppMarket
            Icon={IoLogoGooglePlaystore}
            label="Android"
            href={aosUrl}
          />
        ) : null}
      </div>
    </>
  );
};

export default AppsScreen;
