export const mlData = [
  {
    id: 'regression',
    method: 'Regression',
    rowColor: '#fff3e0',
    lossFunctions: [
      'Mean Squared Error (MSE)',
      'Mean Absolute Error (MAE)',
      'Huber Loss',
    ],
    activationFunctions: ['ReLU', 'Sigmoid', 'Linear'],
    optimizers: ['SGD', 'Adam', 'RMSprop'],
    datasets: ['Boston Housing', 'California Housing', 'Diabetes'],
    hiddenActivations: ['ReLU', 'Tanh'],
    outputActivations: ['Linear'],
    evaluationMetrics: ['R-squared', 'MSE', 'MAE', 'RMSE'],
    regularization: ['L1 (Lasso)', 'L2 (Ridge)', 'ElasticNet', 'Dropout'],
    architectures: ['MLP', 'Linear Regression', 'Polynomial Networks'],
    networkCombinations: [
      {
        hidden: 'ReLU',
        output: 'Linear',
        biologicalExample:
          'Like how your body linearly adjusts sweating rate as temperature rises, continuously scaling output.',
      },
      {
        hidden: 'Tanh',
        output: 'Linear',
        biologicalExample:
          'Like pupil dilation smoothly adjusting between constricted and dilated states for light control.',
      },
    ],
  },
  {
    id: 'classification',
    method: 'Classification',
    rowColor: '#e8f5e9',
    lossFunctions: [
      'Binary Cross-Entropy',
      'Categorical Cross-Entropy',
      'Sparse Categorical Cross-Entropy',
      'Hinge Loss',
    ],
    activationFunctions: ['ReLU', 'Softmax', 'Sigmoid'],
    optimizers: ['Adam', 'SGD with Momentum', 'Adagrad'],
    datasets: ['MNIST', 'CIFAR-10', 'Iris', 'Fashion-MNIST'],
    hiddenActivations: ['ReLU', 'Leaky ReLU'],
    outputActivations: ['Softmax', 'Sigmoid'],
    evaluationMetrics: [
      'Accuracy',
      'Precision',
      'Recall',
      'F1-Score',
      'AUC-ROC',
      'Confusion Matrix',
    ],
    regularization: ['Dropout', 'Batch Normalization', 'L2', 'Early Stopping'],
    architectures: ['CNN', 'MLP', 'ResNet', 'VGG', 'Transformer'],
    networkCombinations: [
      {
        hidden: 'ReLU',
        output: 'Softmax',
        biologicalExample:
          'Like how your immune system identifies and classifies pathogens into specific threat categories for targeted response.',
      },
      {
        hidden: 'ReLU',
        output: 'Sigmoid',
        biologicalExample:
          'Like a nerve cell firing: either the stimulus is strong enough to trigger an action potential or it is not (binary classification).',
      },
      {
        hidden: 'Leaky ReLU',
        output: 'Softmax',
        biologicalExample:
          'Like the brain distinguishing between multiple tastes: sweet, sour, salty, bitter, umami - each taste bud contributing a small signal even when not dominant.',
      },
    ],
  },
  {
    id: 'clustering',
    method: 'Clustering',
    rowColor: '#e3f2fd',
    lossFunctions: [
      'Reconstruction Loss',
      'KL Divergence',
      'Contrastive Loss',
    ],
    activationFunctions: ['ReLU', 'Sigmoid', 'Tanh'],
    optimizers: ['Adam', 'SGD', 'RMSprop'],
    datasets: ['Iris (unsupervised)', 'Customer Segmentation', 'Image Patches'],
    hiddenActivations: ['ReLU', 'Tanh'],
    outputActivations: ['Sigmoid', 'Softmax'],
    evaluationMetrics: [
      'Silhouette Score',
      'Davies-Bouldin Index',
      'Calinski-Harabasz Index',
      'Inertia',
    ],
    regularization: ['Dropout', 'Weight Decay', 'Noise Injection'],
    architectures: ['Autoencoder', 'Deep Embedded Clustering', 'SOM'],
    networkCombinations: [
      {
        hidden: 'ReLU',
        output: 'Sigmoid',
        biologicalExample:
          'Like how the brain groups similar sensory inputs together - recognizing that a chair and stool belong in the same "seating" cluster.',
      },
      {
        hidden: 'Tanh',
        output: 'Softmax',
        biologicalExample:
          'Like how a flock of birds self-organizes into groups based on proximity and speed without any central leader.',
      },
    ],
  },
  {
    id: 'dimensionality',
    method: 'Dimensionality Reduction',
    rowColor: '#fce4ec',
    lossFunctions: [
      'Reconstruction Loss',
      'KL Divergence',
      'Frobenius Norm',
    ],
    activationFunctions: ['ReLU', 'Linear', 'Sigmoid'],
    optimizers: ['Adam', 'SGD', 'L-BFGS'],
    datasets: ['MNIST', 'Swiss Roll', 'Olivetti Faces', 'Gene Expression'],
    hiddenActivations: ['ReLU', 'Tanh'],
    outputActivations: ['Linear', 'Sigmoid'],
    evaluationMetrics: [
      'Reconstruction Error',
      'Explained Variance Ratio',
      'Trustworthiness',
      'Stress (MDS)',
    ],
    regularization: ['Sparsity Constraint', 'L1', 'Dropout', 'KL Penalty'],
    architectures: ['Autoencoder', 'Variational Autoencoder', 'PCA Network'],
    networkCombinations: [
      {
        hidden: 'ReLU',
        output: 'Linear',
        biologicalExample:
          'Like how the retina compresses millions of photoreceptor signals into ~1 million optic nerve fibers - reducing dimensionality while preserving essential visual info.',
      },
      {
        hidden: 'Tanh',
        output: 'Sigmoid',
        biologicalExample:
          'Like how your brain creates a simplified "mental map" of a city - reducing the 3D complexity to a 2D representation you can navigate.',
      },
    ],
  },
  {
    id: 'semisupervised',
    method: 'Semi-Supervised Learning',
    rowColor: '#f3e5f5',
    lossFunctions: [
      'Cross-Entropy + Consistency Loss',
      'Pseudo-Label Loss',
      'Contrastive Loss',
    ],
    activationFunctions: ['ReLU', 'Leaky ReLU', 'GELU'],
    optimizers: ['Adam', 'AdamW', 'SGD with Momentum'],
    datasets: ['STL-10', 'CIFAR-10 (partial labels)', 'Unlabeled Text Corpora'],
    hiddenActivations: ['ReLU', 'GELU'],
    outputActivations: ['Softmax', 'Sigmoid'],
    evaluationMetrics: [
      'Accuracy',
      'F1-Score',
      'Label Efficiency Curve',
      'Semi-Supervised Gain',
    ],
    regularization: [
      'Consistency Regularization',
      'Entropy Minimization',
      'MixUp',
      'Dropout',
    ],
    architectures: [
      'Mean Teacher',
      'FixMatch',
      'MixMatch',
      'Temporal Ensembling',
    ],
    networkCombinations: [
      {
        hidden: 'ReLU',
        output: 'Softmax',
        biologicalExample:
          'Like a child learning animals: parents label a few ("dog", "cat"), then the child generalizes to identify unlabeled animals using learned patterns.',
      },
      {
        hidden: 'GELU',
        output: 'Softmax',
        biologicalExample:
          'Like an apprentice chef who is taught a few recipes explicitly, then uses those principles to experiment and learn new dishes on their own.',
      },
    ],
  },
  {
    id: 'generative',
    method: 'Generative Models',
    rowColor: '#e0f7fa',
    lossFunctions: [
      'Adversarial Loss',
      'Reconstruction + KL Divergence',
      'Wasserstein Distance',
      'Diffusion Loss',
    ],
    activationFunctions: [
      'ReLU',
      'LeakyReLU',
      'Tanh',
      'Sigmoid',
      'SiLU/Swish',
    ],
    optimizers: ['Adam', 'RMSprop', 'AdamW'],
    datasets: [
      'CelebA',
      'LSUN',
      'ImageNet',
      'LAION-5B',
    ],
    hiddenActivations: ['LeakyReLU', 'ReLU', 'SiLU'],
    outputActivations: ['Tanh', 'Sigmoid'],
    evaluationMetrics: [
      'FID (Frechet Inception Distance)',
      'IS (Inception Score)',
      'LPIPS',
      'SSIM',
    ],
    regularization: [
      'Spectral Normalization',
      'Gradient Penalty',
      'Label Smoothing',
      'Dropout',
    ],
    architectures: ['GAN', 'VAE', 'Diffusion Model', 'Flow-based Model'],
    networkCombinations: [
      {
        hidden: 'LeakyReLU',
        output: 'Tanh',
        biologicalExample:
          'Like how an artist (generator) creates paintings and a critic (discriminator) evaluates them - both improving over time through competition.',
      },
      {
        hidden: 'ReLU',
        output: 'Sigmoid',
        biologicalExample:
          'Like how DNA encodes the blueprint (latent space) for creating complex organisms - a compact representation that generates immense diversity.',
      },
      {
        hidden: 'SiLU',
        output: 'Tanh',
        biologicalExample:
          'Like how a dream slowly comes into focus: diffusion models start with pure noise and gradually denoise into a clear image, similar to how memories crystallize during sleep.',
      },
    ],
  },
  {
    id: 'rl',
    method: 'Reinforcement Learning',
    rowColor: '#fff9c4',
    lossFunctions: [
      'Policy Gradient Loss',
      'Temporal Difference Error',
      'Bellman Loss',
      'PPO Clipped Loss',
    ],
    activationFunctions: ['ReLU', 'Tanh', 'Softmax'],
    optimizers: ['Adam', 'RMSprop', 'SGD'],
    datasets: [
      'OpenAI Gym (CartPole)',
      'Atari Games',
      'MuJoCo',
      'StarCraft II',
    ],
    hiddenActivations: ['ReLU', 'Tanh'],
    outputActivations: ['Softmax', 'Linear', 'Tanh'],
    evaluationMetrics: [
      'Cumulative Reward',
      'Average Episode Length',
      'Win Rate',
      'Sample Efficiency',
    ],
    regularization: [
      'Entropy Regularization',
      'Reward Clipping',
      'Gradient Clipping',
      'Target Network',
    ],
    architectures: ['DQN', 'A3C', 'PPO', 'SAC', 'Actor-Critic'],
    networkCombinations: [
      {
        hidden: 'ReLU',
        output: 'Softmax',
        biologicalExample:
          'Like a dog learning tricks: performing an action, receiving a treat (reward), and gradually learning which behaviors maximize treats.',
      },
      {
        hidden: 'ReLU',
        output: 'Linear',
        biologicalExample:
          'Like how dopamine neurons estimate future reward values - computing expected returns for different possible actions.',
      },
      {
        hidden: 'Tanh',
        output: 'Tanh',
        biologicalExample:
          'Like a cheetah learning to hunt: continuously adjusting speed and direction (continuous actions) based on prey movement and past success.',
      },
    ],
  },
];
