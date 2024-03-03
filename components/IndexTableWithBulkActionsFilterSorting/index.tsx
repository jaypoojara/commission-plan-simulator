import type { IndexFiltersProps } from "@shopify/polaris";
import {
  Card,
  EmptySearchResult,
  IndexFilters,
  IndexTable,
  Text,
  TextField,
  useBreakpoints,
  useIndexResourceState,
  useSetIndexFiltersMode,
} from "@shopify/polaris";
import { useCallback, useEffect, useState } from "react";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function IndexTableWithBulkActionsFilterSorting() {
  // data
  const [products, setProducts] = useState(
    new Array(10).fill("").map((value, index) => {
      return {
        id: index + 1,
        productName: [
          "Shampoo",
          "Soap",
          "Shower Gell",
          "Face wash",
          "Cream",
          "Lotion",
        ][index % 6],
        productType: "Coesmetic",
        price: (
          <Text as="span" variant="bodyMd">
            ${10 * (index + 1)}
          </Text>
        ),
        commissionPercent: (
          <TextField
            label="Commission percent"
            autoComplete=""
            suffix="%"
            labelHidden
            placeholder="10"
            value="10"
            maxLength={10}
            size="slim"
            clearButton
            inputMode="numeric"
            min={0}
            disabled
          />
        ),
      };
    })
  );
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sortSelected, setSortSelected] = useState(["product asc"]);
  const [queryValue, setQueryValue] = useState("");

  // custom hooks
  const { mode, setMode } = useSetIndexFiltersMode();
  const {
    selectedResources,
    allResourcesSelected,
    handleSelectionChange,
    clearSelection,
  } = useIndexResourceState(products);

  // handler functions
  const onHandleCancel = () => {};
  const onHandleSave = async () => {
    await sleep(1);
    return true;
  };
  const handleFiltersQueryChange = useCallback(
    (value: string) => {
      const d = products.filter((productItem) => {
        console.log({ value, r: productItem.productName.search(value) });
        return (
          productItem.productName.toLowerCase().search(value.toLowerCase()) !==
          -1
        );
      });
      setProducts(d);
      setQueryValue(value);
    },
    [products]
  );
  const handleOnSortChange = useCallback(
    (values: string[]) => {
      setSortSelected(values);
      const isAscending =
        values
          .find(
            (valueItem) => valueItem?.toLowerCase()?.search("product") !== -1
          )
          ?.search("asc") !== -1;
      const updateProducts = products.sort((a, b) => {
        if (isAscending) {
          return a.id - b.id;
        } else {
          return b.id - a.id;
        }
      });
      setProducts(updateProducts);
    },
    [products]
  );
  const handleQueryValueRemove = useCallback(() => setQueryValue(""), []);
  const handleFiltersClearAll = useCallback(() => {
    handleQueryValueRemove();
  }, [handleQueryValueRemove]);

  // options and actions
  const primaryAction: IndexFiltersProps["primaryAction"] = {
    type: "save",
    onAction: onHandleSave,
    disabled: false,
    loading: false,
  };
  const sortOptions: IndexFiltersProps["sortOptions"] = [
    {
      label: "Product Id",
      value: "product asc",
      directionLabel: "Ascending",
    },
    {
      label: "Product Id",
      value: "product desc",
      directionLabel: "Descending",
    },
  ];
  const promotedBulkActions = [
    {
      content: "Bulk Delete",
      onAction: () => {
        clearSelection();
        console.log("Todo: implement Bulk Delete");
      },
    },
    {
      content: "Bulk Edit",
      onAction: () => {
        clearSelection();
        console.log("Todo: implement Bulk Edit");
      },
    },
  ];
  const resourceName = {
    singular: "commission",
    plural: "commissions",
  };
  // markup
  const emptyStateMarkup = (
    <EmptySearchResult
      title={"No Product Found"}
      description={"Try changing the filters or search term"}
      withIllustration
    />
  );
  const rowMarkup = products.map(
    ({ id, productName, productType, price, commissionPercent }, index) => (
      <IndexTable.Row
        id={id.toString()}
        key={id}
        selected={selectedResources.includes(id.toString())}
        position={index}
      >
        <IndexTable.Cell>{id}</IndexTable.Cell>
        <IndexTable.Cell>{productName}</IndexTable.Cell>
        <IndexTable.Cell>{productType}</IndexTable.Cell>
        <IndexTable.Cell>{price}</IndexTable.Cell>
        <IndexTable.Cell>{commissionPercent}</IndexTable.Cell>
      </IndexTable.Row>
    )
  );

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Card padding="0">
      <IndexFilters
        sortOptions={sortOptions}
        sortSelected={sortSelected}
        queryValue={queryValue}
        queryPlaceholder="Searching in all"
        onQueryChange={handleFiltersQueryChange}
        onQueryClear={() => setQueryValue("")}
        onSort={handleOnSortChange}
        primaryAction={primaryAction}
        cancelAction={{
          onAction: onHandleCancel,
          disabled: false,
          loading: false,
        }}
        tabs={[]}
        selected={selected}
        onSelect={setSelected}
        filters={[]}
        onClearAll={handleFiltersClearAll}
        mode={mode}
        setMode={setMode}
        loading={loading}
      />
      <IndexTable
        resourceName={resourceName}
        condensed={useBreakpoints().smDown}
        itemCount={products.length}
        selectedItemsCount={
          allResourcesSelected ? "All" : selectedResources.length
        }
        onSelectionChange={handleSelectionChange}
        emptyState={emptyStateMarkup}
        hasMoreItems
        promotedBulkActions={promotedBulkActions}
        hasZebraStriping
        headings={[
          { title: "Product Id", defaultSortDirection: "ascending" },
          { title: "Product Name" },
          { title: "Product Type" },
          { title: "Price" },
          { title: "Commission Percent" },
        ]}
        pagination={{
          hasNext: true,
          nextTooltip: "Fetch next 10 product",
          previousTooltip: "Fetch previous 10 product",
          hasPrevious: true,
          onNext: () => {
            setLoading(true);
          },
          onPrevious: () => {
            setLoading(true);
          },
        }}
        sortable={[true]}
      >
        {rowMarkup}
      </IndexTable>
    </Card>
  );
}

export default IndexTableWithBulkActionsFilterSorting;
