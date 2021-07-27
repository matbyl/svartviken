import { useStaticQuery, graphql } from "gatsby"
export const useStorageRoot = () => {
  const { storageRootConfig } = useStaticQuery(
    graphql`
      query {
        storageRootConfig: contentfulConfig(name: {eq: "StorageRoot"}) {
            config {
                storageRoot
            }
        }
      }
    `
  )
  return { storageRoot: storageRootConfig.config.storageRoot }
}
