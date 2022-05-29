import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Layout, Button, Banner, Toast, Stack, Frame } from '@shopify/polaris';
import { Loading } from '@shopify/app-bridge-react';

const UPDATE_PRICE = gql`
  mutation productVariantUpdate($input: ProductVariantInput!) {
    productVariantUpdate(input: $input) {
      product {
        title
      }
      productVariant {
        id
        price
      }
    }
  }
`;

export const ApplyRandomPrices = ({ selectedItems, onUpdate }) => {
  const [hasResults, setHasResults] = useState(false);

  const [mutateFunction, { loading, error }] = useMutation(UPDATE_PRICE);

  const handleClick = async () => {
    const productVariableInput = selectedItems.map((item) => ({
      id: item.variants.edges[0].node.id,
      price: Math.random().toPrecision(3) * 10,
    }));

    const reqArray = productVariableInput.map((item) =>
      mutateFunction({
        variables: { input: item },
      })
    );

    await Promise.all(reqArray);
    await onUpdate();

    setHasResults(true);
  };

  if (error) {
    console.warn(error);
    return <Banner status='critical'>{error.message}</Banner>;
  }

  return (
    <Frame>
      {hasResults && <Toast content='Successfully updated' onDismiss={() => setHasResults(false)} />}

      <Layout.Section>
        <Stack distribution='center'>
          <Button primary textAlign='center' loading={loading} onClick={handleClick}>
            Randomize prices
          </Button>
        </Stack>
      </Layout.Section>
    </Frame>
  );
};
