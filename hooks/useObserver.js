import { useEffect } from "react"

export const useObserver = ({
    target, // 감지할 대상 (ref)
    onIntersect, // 감지 시 실행할 callback 함수
    root = null, // 교차할 부모 요소, 아무것도 넘기지 않으면 document
    rootMargin = "0px", // root와 target이 감지하는 여백의 거리
    threshold = 1.0, // 임계점. 1.0이면 root내에서 target이 100% 보여질 때 callback이 실행된다.
}) => {
    useEffect(() => {
        let observer

        // 넘어오는 element가 있어야 observer를 생성할 수 있도록 한다.
        if (target && target.current) {
            observer = new IntersectionObserver(onIntersect, { root, rootMargin, threshold })
            // 실제 Element가 들어있는 current 관측을 시작한다.
            observer.observe(target.current)
        }

        // observer 사용하는 컴포넌트가 해제되면 observer 끄기
        return () => observer && observer.disconnect()
    }, [target, rootMargin, threshold])
}