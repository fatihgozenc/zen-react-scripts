declare module '*.svg' {
    const content: any;
    // const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    export default content;
}

declare module '*.png' {
    const content: any;
    // const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    export default content;
}

declare module '*.jpg' {
    const content: any;
    // const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    export default content;
}

declare module "*.worker" {
    class WebpackWorker extends Worker {
        constructor();
    }
    export default WebpackWorker;
}

declare var classes: any;
declare var css: any;
