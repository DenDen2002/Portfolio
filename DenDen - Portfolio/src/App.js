import Routing from "./routes/Routes";
import React, {useEffect} from 'react';
import { screenTypeContext, screenType } from "./context/mobileContext";
import { ThemeProvider } from "./context/lightContext";

function App() {

  useEffect(() => {
    const imgs = [
        '/project/neptinium/neptiniumheader.png',
        '/project/neptinium/placeholder1.png',
        '/project/neptinium/placeholder2.png',
        '/project/neptinium/placeholder3.png',
        '/project/neptinium/placeholder4.png',
        '/project/aid/aidheader.png',
        '/project/aid/pipeline1.png',
        '/project/aid/pipeline2.png',
        '/project/aid/pipeline3.png',
        '/project/aid/pipeline4.png',
        '/project/aid/pipeline5.png',
        '/project/communitychess/ccheader.png',
        '/project/flea/fleaheader.png',
        '/project/flea/mockup1.png',
        '/project/flea/mockup2.png',
        '/project/flea/mockup3.png',
        '/project/flea/mockup4.png',
        '/project/flea/mockup5.png',
        '/project/flea/mockup6.png',
        '/project/flea/mockup7.png',
        '/project/cvhand/cvdiag.png',
        '/project/cvhand/cvheader.png',
        '/project/kopilo/dbsheader.png',
        '/project/satiscribe/satiscribeheader.png',
        '/project/satiscribe/edit.png',
        '/project/satiscribe/edittemplate.png',
        '/project/satiscribe/final.png',
        '/project/satiscribe/homedb.png',
        '/project/satiscribe/projdb.png',
        '/project/satiscribe/tag.png',
        '/project/satiscribe/template.png',
        '/project/sloy/sloyheader.png',
        '/project/sloy/sloymenu.png',
        '/project/sloy/sloypic.png',
        '/project/sloy/sloytut.png',
        '/project/sloy/sloyui.png',
    ];
    cacheImages(imgs)
}, [])


const cacheImages = async (srcArray) => {
    const promises = await srcArray.map((src) => {
        return new Promise(function (resolve, reject) {
            const img = new Image();

            img.src = src
            img.onload = resolve();
            img.onerror = reject();
        })
    })
    await Promise.all(promises);
}   

  return (
    <screenTypeContext.Provider value={screenType()}>
      <ThemeProvider>
        <Routing>
        </Routing>
      </ThemeProvider>
    </screenTypeContext.Provider>
  );
}

export default App;
