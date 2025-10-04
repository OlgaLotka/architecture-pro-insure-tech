### <a name="_u8xz25hbrgql"></a>** Добавление скейлинкга**

Создаем неймспейс
```bash
kubectl apply -f namespace.yaml
 ```
Деплоим сервис который будем скейлить
```bash
kubectl apply -f deployment.yaml
 ```
Динамическая маршрутизация на основании показателей утилизации памяти
```bash
kubectl apply -f hpa.yaml
 ```
Ставим Prometheus
```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
 ```

```bash
helm repo update
 ```
```bash
helm install prometheus-operator prometheus-community/kube-prometheus-stack
 ```
```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
 ```
```bash
helm install my-prometheus-adapter prometheus-community/prometheus-adapter
  ```
Настройка метрик
```bash
kubectl apply -f ServiceMonitor.yaml
 ```
Динамическая маршрутизация на основании показателей количества запросов в секунду
```bash
kubectl apply -f hpa_rps.yaml
 ```
Настройка метрик
```bash
helm upgrade  my-prometheus-adapter prometheus-community/prometheus-adapter -f values.yaml
 ```
Проверяем появились ли кастомные метрики
```bash
kubectl get --raw /apis/custom.metrics.k8s.io/v1beta1
 ```
Форвардим порты чтобы локально смотреть в метрики
```bash
kubectl port-forward -n default prometheus-prometheus-operator-kube-p-prometheus-0 9090

 ```