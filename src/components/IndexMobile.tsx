import { DetectedBarcode } from "@undecaf/barcode-detector-polyfill";
import { BarcodeScanner } from "react-barcode-scanner";
import { BarcodeDetectorPolyfill } from "@undecaf/barcode-detector-polyfill";
import { useEffect, useState } from "react";
import { getDocs, query, where } from "firebase/firestore";
import db from "../db";
import { useNavigate } from "@tanstack/react-router";

export default function IndexMobile() {
  const [encodings, setEncodings] = useState([]);
  const [unknown, setUnknown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // @ts-ignore
    window["BarcodeDetector"] = BarcodeDetectorPolyfill;

    // @ts-ignore
    window.BarcodeDetector.getSupportedFormats().then((formats) =>
      setEncodings(formats)
    );
    console.log(encodings);
  }, []);

  const onCapture = async (code: DetectedBarcode) => {
    const itemQuery = query(
      db.inventory,
      where("inventoryNumber", "==", code.rawValue)
    );

    const document = (await getDocs(itemQuery));
    if(!document.docs[0]) {
        setUnknown(true);
        return;
    }
    setUnknown(false)

    const id = document.docs[0].id;

    navigate({
      to: "/item",
      search: {
        uid: id,
      },
    });
  };

  return (
    <div>
      {unknown ? <p className="text-2xl font-semibold">Tundmatu üksus</p> : null}
      <BarcodeScanner
        options={{
          formats: encodings,
        }}
        onCapture={onCapture}
      />
      <form>

      </form>
    </div>
  );
}
