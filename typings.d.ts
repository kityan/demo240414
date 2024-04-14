declare const webpack_isProduction: boolean

declare const webpack_appVersion: string

declare module "*.module.scss" {
  const classes: { [key: string]: string }
  export default classes
}

declare module "*.scss" {
  const classes: { [key: string]: string }
  export default classes
}

declare module "*.css" {
  const classes: { [key: string]: string }
  export default classes
}

declare module "*.png" {
  const value: any
  export default value
}

declare module "*.svg" {
  const value: any
  export default value
}
