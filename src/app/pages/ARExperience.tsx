import { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { useDocumentTitle } from "../useDocumentTitle";
import { getARStaticUrl, getAppPath } from "../arPaths";

export const ARExperience = () => {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const backTarget = searchParams.get("back") || getAppPath("/ar-viewer");
  const staticUrl = getARStaticUrl(id, backTarget);

  useDocumentTitle("mol - AR");

  useEffect(() => {
    if (staticUrl) {
      window.location.replace(staticUrl);
      return;
    }

    navigate(backTarget, { replace: true });
  }, [backTarget, navigate, staticUrl]);

  return null;
};
