import { useEffect, useRef } from "react";

export const useMasonry = (images) => {
    let layout = [[], [], []];
    for (let i = 0; i < images.length; i++) {
        layout[i % 3].push(images[i]);
    }
    return { layout };
}

export const useLoadingBar = (isLoading) => {
    const loadingBar = useRef();
    useEffect(() => {
        isLoading ? loadingBar.current.continuousStart() : loadingBar.current.complete();
        // eslint-disable-next-line/exhaustive-deps
    }, [isLoading])

    return { loadingBar }

}
