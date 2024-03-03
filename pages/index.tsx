import IndexTableWithBulkActionsFilterSorting from "@/components/IndexTableWithBulkActionsFilterSorting";
import { Card, Layout, LegacyCard, Page, Text } from "@shopify/polaris";

const Home = () => {
  return (
    <>
      <Page fullWidth>
        <Layout>
          <Layout.Section>
            <Card>
              <Text as="h1" variant="headingLg">
                Commission Plan Simulator
              </Text>
            </Card>
          </Layout.Section>
          <Layout.Section>
            <IndexTableWithBulkActionsFilterSorting />
          </Layout.Section>
        </Layout>
      </Page>
    </>
  );
};

export default Home;
